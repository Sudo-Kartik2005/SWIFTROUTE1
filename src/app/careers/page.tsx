
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jobOpenings = [
    {
        title: "Senior Software Engineer",
        location: "San Francisco, CA",
        department: "Engineering"
    },
    {
        title: "Product Manager, Rider Experience",
        location: "New York, NY",
        department: "Product"
    },
    {
        title: "Data Scientist",
        location: "Remote",
        department: "Data & Analytics"
    },
    {
        title: "Marketing Lead, Growth",
        location: "London, UK",
        department: "Marketing"
    }
];

export default function CareersPage() {
  return (
    <div className="flex-1 w-full bg-background">
      <section className="relative w-full py-20 md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1549924231-f97d58434c6d?q=80&w=1920&h=1080&auto=format&fit=crop"
          alt="Office environment"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0 opacity-10"
          data-ai-hint="modern office"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Join Our Team</h1>
          <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
            We're looking for passionate people to join us on our mission to change the future of transportation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="p-6">
                      <Sparkles className="h-10 w-10 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
                      <p className="text-muted-foreground">Work on products that millions of people use every day to navigate their world.</p>
                  </div>
                   <div className="p-6">
                      <Briefcase className="h-10 w-10 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Grow Your Career</h3>
                      <p className="text-muted-foreground">We invest in our people with mentorship, training, and opportunities for growth.</p>
                  </div>
                   <div className="p-6">
                      <MapPin className="h-10 w-10 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Great Benefits</h3>
                      <p className="text-muted-foreground">Enjoy competitive salaries, comprehensive health benefits, and a flexible work environment.</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground mt-1">
                      {job.department} &middot; <span className="inline-flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                    </p>
                  </div>
                  <Button asChild>
                      <Link href="#">Apply Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
               <p className="text-muted-foreground">Don't see a role that fits? <Link href="#" className="text-primary font-semibold hover:underline">Get in touch</Link>.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
