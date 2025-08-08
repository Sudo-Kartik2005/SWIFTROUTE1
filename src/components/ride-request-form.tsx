
'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { MapPin, DollarSign, Loader2, LocateFixed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { handleEstimateFare, fetchAddressFromCoords, type FareEstimateState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

const initialState: FareEstimateState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full font-bold" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Get Fare Estimate'}
    </Button>
  );
}

export function RideRequestForm() {
  const [state, formAction] = useActionState(handleEstimateFare, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.success && state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);
  
  const handleConfirmRide = () => {
    if (state.success && state.pickupLocation && state.dropoffLocation && state.estimatedFare) {
        const params = new URLSearchParams({
        pickup: state.pickupLocation,
        dropoff: state.dropoffLocation,
        fare: state.estimatedFare.toString(),
        });
        router.push(`/confirmation?${params.toString()}`);
    }
  }

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const result = await fetchAddressFromCoords(latitude, longitude);
          if (result.address && pickupInputRef.current) {
            pickupInputRef.current.value = result.address;
          } else if (result.error) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: result.error,
            });
          }
          setIsLocating(false);
        },
        (error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: "Could not get your location. Please ensure you have granted location permissions.",
          });
          setIsLocating(false);
        }
      );
    } else {
      toast({
            variant: 'destructive',
            title: 'Error',
            description: "Geolocation is not supported by your browser.",
          });
      setIsLocating(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl bg-card/95 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Where to?</CardTitle>
          <CardDescription>Enter your pickup and drop-off locations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="pickupLocation"
                placeholder="Enter pick-up location"
                className="pl-10 pr-10 h-12 text-base"
                required
                ref={pickupInputRef}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-accent"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                aria-label="Use Current Location"
              >
                {isLocating ? <Loader2 className="animate-spin h-5 w-5" /> : <LocateFixed className="h-5 w-5" />}
              </Button>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                name="dropoffLocation"
                placeholder="Enter drop-off location"
                className="pl-10 h-12 text-base"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.success && state.estimatedFare !== undefined && (
        <Card className="mt-8 shadow-2xl animate-in fade-in-50 border-2 border-accent">
          <CardHeader>
            <CardTitle>Fare Estimate</CardTitle>
            <CardDescription>Review your trip details and confirm.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-semibold">{state.pickupLocation}</p>
                  </div>
              </div>
              <Separator/>
              <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="font-semibold">{state.dropoffLocation}</p>
                  </div>
              </div>
            </div>
            <div className="flex items-baseline justify-center text-5xl font-bold py-4">
              <span className="text-3xl mr-1">₹</span>
              <span>{state.estimatedFare.toFixed(2)}</span>
            </div>
            <p className="text-xs text-center text-muted-foreground">
                This is an estimate and may vary based on traffic and other factors.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full font-bold" onClick={handleConfirmRide}>
              Confirm Ride <ArrowRight className="ml-2"/>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
