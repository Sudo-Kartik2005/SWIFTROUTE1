
import { RideRequestForm } from '@/components/ride-request-form';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Handshake } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const howItWorks = [
  {
    icon: Zap,
    title: 'Request',
    description: 'Tap a button, set your destination, and get a ride in minutes.',
  },
  {
    icon: ShieldCheck,
    title: 'Ride',
    description: 'Enjoy a safe and comfortable ride with our vetted drivers.',
  },
  {
    icon: Handshake,
    title: 'Pay',
    description: 'Seamlessly pay through the app. No cash required.',
  },
];

const testimonials = [
    {
        name: "Sarah J.",
        role: "Frequent Traveler",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
        dataAiHint: "woman smiling",
        comment: "SwiftRoute has been a lifesaver for my business trips. Always reliable and professional."
    },
    {
        name: "Mike D.",
        role: "City Commuter",
        avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=100&h=100&auto=format&fit=crop",
        dataAiHint: "man professional",
        comment: "The easiest way to get around town. The app is intuitive and the drivers are great."
    },
    {
        name: "Priya K.",
        role: "Student",
        avatar: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=100&h=100&auto=format&fit=crop",
        dataAiHint: "woman happy",
        comment: "Affordable and convenient. I use SwiftRoute to get to my campus every day."
    }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1528291353264-7538a71d79d1?q=80&w=1920&h=1080&auto=format&fit=crop"
          alt="Aerial view of a modern smart city with roads glowing at night"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0"
          data-ai-hint="aerial city night"
          sizes="100vw"
          priority
        />
        <div className="relative z-20 w-full max-w-4xl px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Get a ride in minutes</h1>
            <p className="text-lg md:text-xl mb-8">The best way to get wherever you're going.</p>
            <div className="w-full max-w-2xl mx-auto">
                 <RideRequestForm />
            </div>
        </div>
      </section>
      
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">How SwiftRoute works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="text-center shadow-lg border-0">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">What people are saying</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                      <Card key={testimonial.name} className="bg-card shadow-lg border-0">
                          <CardContent className="pt-6">
                              <div className="flex items-start space-x-4">
                                  <Avatar className="w-12 h-12 border-2 border-primary">
                                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                      <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                                      <p className="font-bold mt-4">{testimonial.name}</p>
                                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
}
