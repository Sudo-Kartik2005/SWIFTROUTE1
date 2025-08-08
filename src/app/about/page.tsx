
import { Building, Target, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex-1 w-full bg-background">
       <section className="relative py-20 md:py-32 text-center bg-primary text-primary-foreground">
         <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-background z-10" />
         <div className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(var(--accent),0.1),_transparent_40%)]" />
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold">About SwiftRoute</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            We are revolutionizing urban mobility, one ride at a time.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Our mission is to create the most reliable and convenient transportation network to improve lives in our cities. We aim to connect people, communities, and businesses seamlessly through technology, making transportation accessible, safe, and affordable for everyone.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1549222451-3439434e3223?q=80&w=600&h=400&auto=format&fit=crop"
                alt="City transportation"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint="city public transport"
              />
            </div>
            <div className="relative h-96">
                 <Image
                    src="https://images.unsplash.com/photo-1517816743773-6e0fd5f80482?q=80&w=600&h=800&auto=format&fit=crop"
                    alt="Team working"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="team collaboration"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-muted-foreground">We are deeply committed to meeting the needs of our customers and constantly focus on customer satisfaction.</p>
            </div>
            <div className="text-center p-6">
              <Building className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">We operate with honesty and transparency in everything we do, building trust with our riders, drivers, and partners.</p>
            </div>
            <div className="text-center p-6">
              <Target className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">We continuously innovate and improve our services to provide the best possible experience in urban mobility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
