import { RideRequestForm } from '@/components/ride-request-form';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center p-4">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Cityscape background"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="city dusk"
          sizes="100vw"
          priority
        />
        <div className="relative z-10 w-full">
          <RideRequestForm />
        </div>
      </section>
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Ride, On-Demand</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            SwiftRoute offers a reliable and convenient way to get around. With just a few taps, a car will be at your doorstep.
          </p>
        </div>
      </section>
    </main>
  );
}
