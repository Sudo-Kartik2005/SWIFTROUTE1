
'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Loader2, LocateFixed, Car, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleEstimateFare, fetchAddressFromCoords, type FareEstimateState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const initialState: FareEstimateState = {
  success: false,
};

function SubmitButton({ isPending, hasEstimate }: { isPending: boolean, hasEstimate: boolean }) {
  return (
    <Button type="submit" size="lg" className="w-full font-bold" disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : hasEstimate ? 'Confirm Ride' : 'Get Fare Estimate'}
      {!isPending && hasEstimate && <ArrowRight className="ml-2" />}
    </Button>
  );
}


export function RideRequestForm() {
  const [state, formAction, isPending] = useActionState(handleEstimateFare, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success && state.estimatedFare !== undefined) {
        if(state.isConfirmation){
            if (state.pickupLocation && state.dropoffLocation && state.estimatedFare && state.vehicleType) {
              const params = new URLSearchParams({
                pickup: state.pickupLocation,
                dropoff: state.dropoffLocation,
                fare: state.estimatedFare.toString(),
                vehicleType: state.vehicleType,
              });
              router.push(`/confirmation?${params.toString()}`);
            }
        }
    }
    if (!state.success && state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast, router]);

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

  const hasEstimate = state.success && state.estimatedFare !== undefined;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-2 border-transparent w-full">
      <CardContent className="p-4">
        <form action={formAction} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
                <Label htmlFor='pickupLocation' className="sr-only">Pickup Location</Label>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                id="pickupLocation"
                name="pickupLocation"
                placeholder="Enter pickup location"
                className="pl-10 pr-10 h-12 text-base"
                required
                ref={pickupInputRef}
                defaultValue={state.pickupLocation}
                key={`pickup-${state.pickupLocation}`}
                />
                <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-accent"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                aria-label="Use Current Location"
                >
                {isLocating ? <Loader2 className="animate-spin h-5 w-5" /> : <LocateFixed className="h-5 w-5" />}
                </Button>
            </div>
            <div className="relative">
                <Label htmlFor='dropoffLocation' className="sr-only">Dropoff Location</Label>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                id="dropoffLocation"
                name="dropoffLocation"
                placeholder="Enter drop-off location"
                className="pl-10 h-12 text-base"
                required
                defaultValue={state.dropoffLocation}
                key={`dropoff-${state.dropoffLocation}`}
                />
            </div>
          </div>
          
          <div>
            <RadioGroup name="vehicleType" defaultValue={state.vehicleType || "Economy"} className="grid grid-cols-3 gap-4">
              {['Economy', 'Premium', 'SUV'].map((type) => (
                <Label key={type} htmlFor={type} className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                  <RadioGroupItem value={type} id={type} className="sr-only" />
                  <Car className="mb-3 h-6 w-6" />
                  {type}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <input type="hidden" name="isConfirmation" value={String(hasEstimate)} />
          
          {!hasEstimate ? (
             <SubmitButton isPending={isPending} hasEstimate={!!hasEstimate} />
          ): null}

          {isPending && !hasEstimate && (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Finding the best route...</p>
            </div>
          )}

          {hasEstimate && (
             <Card className="bg-muted/50 text-center">
                <CardHeader>
                    <CardDescription>Estimated Fare for {state.vehicleType}</CardDescription>
                    <CardTitle className="text-4xl font-bold">₹{state.estimatedFare?.toFixed(2)}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SubmitButton isPending={isPending} hasEstimate={!!hasEstimate}/>
                </CardContent>
            </Card>
          )}

        </form>
      </CardContent>
    </Card>
  );
}
