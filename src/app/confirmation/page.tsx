'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup') || 'N/A';
  const dropoff = searchParams.get('dropoff') || 'N/A';
  const fare = searchParams.get('fare') || '0';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-background">
      <Card className="w-full max-w-lg shadow-2xl animate-in fade-in-50">
        <CardHeader className="items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl">Ride Confirmed!</CardTitle>
          <CardDescription>Your SwiftRoute is on the way.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4 text-left">
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-semibold">{pickup}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
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
              <p className="font-bold text-xl">${parseFloat(fare).toFixed(2)}</p>
            </div>
          </div>
          <div className="h-48 w-full rounded-lg overflow-hidden relative">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Map placeholder"
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="street map"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
          <Button asChild className="w-full">
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

function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
