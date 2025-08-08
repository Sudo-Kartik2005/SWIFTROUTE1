
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react";
import Image from "next/image";

const faqs = [
    {
        question: "How do I request a ride?",
        answer: "To request a ride, simply enter your pickup and drop-off locations on the main screen and tap 'Get Fare Estimate'. After reviewing the estimate, you can confirm your ride."
    },
    {
        question: "How is the fare estimated?",
        answer: "Our fares are estimated using an advanced AI model that considers the distance of the trip, the estimated time it will take, and current traffic conditions to provide you with a fair and accurate price upfront."
    },
    {
        question: "Can I cancel a ride?",
        answer: "Currently, ride cancellation is not supported through the app after confirmation. Please be sure of your trip details before confirming."
    },
    {
        question: "How can I see my past trips?",
        answer: "You can view your complete trip history by navigating to the 'My Trips' page from the main menu. It will show details of all your past journeys with SwiftRoute."
    },
    {
        question: "What if I have an issue with my ride?",
        answer: "If you encounter any issues with your ride, please contact our support team through the 'Contact Us' section. We are available 24/7 to assist you."
    }
];

export default function HelpPage() {
  return (
    <div className="flex-1 w-full relative">
      <Image
          src="https://placehold.co/1920x1080.png"
          alt="Support background"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0 opacity-10"
          data-ai-hint="geometric pattern"
          sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl font-bold">Help & FAQ</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions about SwiftRoute.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </div>
    </div>
  );
}
