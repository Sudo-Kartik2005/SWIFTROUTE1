
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Loader2, MapPin, PackageOpen, Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";


interface Trip {
    id: string;
    date: string;
    pickup: string;
    dropoff: string;
    fare: number;
    vehicleType: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchTrips = async () => {
        if (user) {
            setLoadingTrips(true);
            try {
                const tripsRef = collection(db, 'users', user.uid, 'trips');
                const q = query(tripsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const trips = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().createdAt.toDate().toISOString(),
                })) as Trip[];
                setTripHistory(trips);
            } catch (error) {
                console.error("Error fetching trips from Firestore:", error);
                toast({
                    variant: "destructive",
                    title: "Error fetching trips",
                    description: "Failed to fetch trip history.",
                });
            } finally {
                setLoadingTrips(false);
            }
        }
    };
    
    if (!authLoading) {
      if (user) {
        fetchTrips();
      } else {
         // Handle guest users
        const storedTrips = localStorage.getItem('tripHistory_guest');
        if (storedTrips) {
            setTripHistory(JSON.parse(storedTrips).reverse());
        }
        setLoadingTrips(false);
      }
    }
  }, [user, authLoading, toast]);

  if (authLoading || (!user && !tripHistory.length)) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Handle case where user is not logged in but might have guest history
  if (!user) {
      router.push('/login');
      return (
        <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  }

  const displayName = user.displayName || user.email;

  return (
    <div className="flex-1 w-full bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.photoURL || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop"} alt="User avatar" data-ai-hint="person smiling" />
            <AvatarFallback>{displayName?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, {displayName}!</h1>
            <p className="text-muted-foreground">Here's a look at your recent trips with SwiftRoute.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Trip History</h2>
        
        <div className="space-y-4">
          {loadingTrips ? (
             <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : tripHistory.length > 0 ? (
            tripHistory.map((trip, index) => (
              <Card key={`${trip.id}-${index}`} className="shadow-lg transition-all hover:shadow-xl hover:border-accent border-2 border-transparent bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-1 space-y-3">
                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(trip.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-500" />
                        <p className="font-semibold">{trip.pickup}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <MapPin className="h-5 w-5 text-red-500" />
                         <p className="font-semibold">{trip.dropoff}</p>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-20 mx-4" />
                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-none">
                        <div className="flex items-center gap-2 text-lg font-bold text-primary">
                            <span>₹{trip.fare.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Car className="h-4 w-4" />
                            <span>{trip.vehicleType}</span>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-lg border-2 border-dashed bg-card/80 backdrop-blur-sm">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                    <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">No Trips Yet</h3>
                    <p className="text-muted-foreground mt-1">Your past rides will appear here.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
