
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Calendar, DollarSign, Loader2, MapPin, PackageOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Placeholder for trip history. In a real app, this would be fetched from a database.
const tripHistory: any[] = [];


export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="profile portrait" />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, {user.email}!</h1>
            <p className="text-muted-foreground">Here's a look at your recent trips with SwiftRoute.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Trip History</h2>
        
        <div className="space-y-4">
          {tripHistory.length > 0 ? (
            tripHistory.map((trip) => (
              <Card key={trip.id} className="shadow-lg transition-all hover:shadow-xl hover:border-accent border-2 border-transparent">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.pickup}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 mx-2 shrink-0" />
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.dropoff}</span>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-10 mx-4" />
                    <div className="flex items-center justify-between sm:justify-start gap-6 pt-4 sm:pt-0 border-t sm:border-none">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(trip.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-bold text-primary">
                        <span>₹{trip.fare.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-lg border-2 border-dashed">
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
