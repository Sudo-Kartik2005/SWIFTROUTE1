
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, MapPin, DollarSign, Car, Loader2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { saveTrip } from '@/app/actions';


function ConfirmationContent() {
  const { toast } = useToast();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup') || 'N/A';
  const dropoff = searchParams.get('dropoff') || 'N/A';
  const fare = searchParams.get('fare') || '0';
  const vehicleType = searchParams.get('vehicleType') || 'Economy';
  const [tripId, setTripId] = useState<string | null>(null);
  const [tripSaved, setTripSaved] =useState(false);

  useEffect(() => {
    if (pickup !== 'N/A' && dropoff !== 'N/A' && !tripSaved) {
      const id = crypto.randomUUID();
      setTripId(id);
      
      const newTrip = {
        id: id,
        pickup,
        dropoff,
        fare: parseFloat(fare),
        vehicleType,
      };

      if (user) {
        // Logged-in user: save to Firestore
        saveTrip({ pickup, dropoff, fare: parseFloat(fare), vehicleType });
      } else {
        // Guest user: save to localStorage
        const storageKey = 'tripHistory_guest';
        const existingTrips = JSON.parse(localStorage.getItem(storageKey) || '[]');
         const isDuplicate = existingTrips.some((trip: any) => 
            trip.pickup === newTrip.pickup &&
            trip.dropoff === newTrip.dropoff &&
            trip.fare === newTrip.fare
          );

        if (!isDuplicate) {
             const updatedTrips = [...existingTrips, { ...newTrip, date: new Date().toISOString()}];
             localStorage.setItem(storageKey, JSON.stringify(updatedTrips));
        }
      }
      
      // Store trip details by ID for sharing
      localStorage.setItem(`trip_${id}`, JSON.stringify({ ...newTrip, date: new Date().toISOString()}));
      
      setTripSaved(true);
    }
  }, [pickup, dropoff, fare, vehicleType, tripSaved, user]);

  const handleShare = () => {
    if (tripId) {
      const shareUrl = `${window.location.origin}/share/${tripId}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Link Copied!',
        description: 'Ride sharing link has been copied to your clipboard.',
      });
    }
  };


  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-background">
      <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 border-2 border-green-500 bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold">Ride Confirmed!</CardTitle>
          <CardDescription>Your SwiftRoute is on the way.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4 text-left">
            <div className="flex items-center gap-4">
                <Car className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground">Vehicle Type</p>
                    <p className="font-semibold">{vehicleType}</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-semibold">{pickup}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="font-semibold">{dropoff}</p>
              </div>
            </div>
             <Separator />
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <p className="font-semibold">Estimated Fare</p>
              </div>
              <p className="font-bold text-xl">₹{parseFloat(fare).toFixed(2)}</p>
            </div>
          </div>
          <div className="h-48 w-full rounded-lg overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1566992648584-9c0b1a6d3652?q=80&w=600&h=400&auto=format&fit=crop"
              alt="Map placeholder"
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="route map"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/">Book Another Ride</Link>
            </Button>
            <Button onClick={handleShare} className="w-full" size="lg" variant="outline">
              <Share2 className="mr-2 h-5 w-5" />
              Share Ride
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    )
}
