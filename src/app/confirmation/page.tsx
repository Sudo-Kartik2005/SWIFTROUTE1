
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, MapPin, DollarSign, Car, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup') || 'N/A';
  const dropoff = searchParams.get('dropoff') || 'N/A';
  const fare = searchParams.get('fare') || '0';
  const vehicleType = searchParams.get('vehicleType') || 'Economy';

  useEffect(() => {
    if (pickup !== 'N/A' && dropoff !== 'N/A') {
      const newTrip = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        pickup,
        dropoff,
        fare: parseFloat(fare),
        vehicleType,
      };

      const existingTrips = JSON.parse(localStorage.getItem('tripHistory') || '[]');
      const updatedTrips = [...existingTrips, newTrip];
      localStorage.setItem('tripHistory', JSON.stringify(updatedTrips));
    }
  }, [pickup, dropoff, fare, vehicleType]);


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
          <Button asChild className="w-full" size="lg">
            <Link href="/">Book Another Ride</Link>
          </Button>
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
