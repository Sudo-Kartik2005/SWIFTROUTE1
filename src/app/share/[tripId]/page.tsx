
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Car, Clock, Loader2, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface Trip {
    id: string;
    date: string;
    pickup: string;
    dropoff: string;
    fare: number;
    vehicleType: string;
}

export default function SharePage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [progress, setProgress] = useState(10);
  const [eta, setEta] = useState(20);

  useEffect(() => {
    const storedTrip = localStorage.getItem(`trip_${params.tripId}`);
    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    }
  }, [params.tripId]);

  useEffect(() => {
    if (trip) {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setEta(0);
                    return 100;
                }
                const newProgress = prev + 5;
                setEta(Math.round(20 - (newProgress/100 * 20)));
                return newProgress;
            });
        }, 2000);
        return () => clearInterval(timer);
    }
  }, [trip]);


  if (!trip) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-background">
        <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Loading Ride Details...</CardTitle>
            </CardHeader>
            <CardContent>
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground mt-4">If this takes too long, please confirm the link is correct.</p>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-secondary">
      <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center">
            <ShieldCheck className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">SwiftRoute Live Tracking</CardTitle>
          <CardDescription>Your friend's ride is in progress.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="h-64 w-full rounded-lg overflow-hidden relative">
                <Image
                src="https://images.unsplash.com/photo-1599723438183-e7f2a15649b3?q=80&w=600&h=400&auto=format&fit=crop"
                alt="Map with live route"
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="route map"
                sizes="(max-width: 768px) 100vw, 500px"
                />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-1/4 left-1/4 bg-green-500 rounded-full h-4 w-4 transform -translate-x-1/2 -translate-y-1/2" />
                    <div 
                        className="absolute bg-blue-500 rounded-full h-6 w-6 border-2 border-white shadow-lg transition-all duration-1000 ease-linear"
                        style={{ top: `${25 + (progress/100 * 50)}%`, left: `${25 + (progress/100 * 50)}%` }}
                    />
                    <div className="absolute bottom-1/4 right-1/4 bg-red-500 rounded-full h-4 w-4 transform translate-x-1/2 translate-y-1/2" />
                </div>
            </div>

            <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                    {progress < 100 ? 'On the way...' : 'Arrived!'}
                </p>
            </div>

            <div className="border rounded-lg p-4 space-y-4 text-left">
                <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                            <p className="text-xs text-muted-foreground">Estimated time of arrival</p>
                            <p className="font-semibold">{eta} minutes</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 text-right">
                        <Car className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                            <p className="text-xs text-muted-foreground">Vehicle</p>
                            <p className="font-semibold">{trip.vehicleType}</p>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-semibold">{trip.pickup}</p>
                </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="font-semibold">{trip.dropoff}</p>
                </div>
                </div>
            </div>

             <Button asChild variant="outline">
                <Link href="/">Book your own SwiftRoute</Link>
             </Button>

        </CardContent>
      </Card>
    </div>
  );
}

