
'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Loader2, LocateFixed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleEstimateFare, fetchAddressFromCoords, type FareEstimateState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const initialState: FareEstimateState = {
  success: false,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" size="lg" className="w-full font-bold" disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : 'Request a Ride'}
    </Button>
  );
}

export function RideRequestForm() {
  const [state, formAction, isPending] = useActionState(handleEstimateFare, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [isLocating, setIsLocating] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success && state.estimatedFare !== undefined) {
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

  return (
    <Card className="bg-background/90 backdrop-blur-sm p-2 rounded-lg">
      <CardContent className="p-2">
        <form action={formAction} className="flex flex-col md:flex-row items-center gap-2">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              name="pickupLocation"
              placeholder="Enter pick-up location"
              className="pl-10 pr-10 h-12 text-base bg-white text-foreground"
              required
              ref={pickupInputRef}
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
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              name="dropoffLocation"
              placeholder="Enter drop-off location"
              className="pl-10 h-12 text-base bg-white text-foreground"
              required
              ref={dropoffInputRef}
            />
          </div>
          {/* Hidden default vehicle type for simplicity in this view */}
          <input type="hidden" name="vehicleType" value="Economy" />

          <SubmitButton isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
