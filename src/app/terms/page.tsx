
import { Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex-1 w-full bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-lg shadow-lg">
          <div className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground mt-2">Last Updated: August 8, 2024</p>
          </div>

          <div className="prose prose-lg max-w-none text-card-foreground">
            <h2 className="font-semibold text-2xl mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to SwiftRoute! These Terms of Service ("Terms") govern your use of our ride-sharing services, applications, and websites (collectively, the "Services"). By using our Services, you agree to be bound by these Terms.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">2. User Accounts</h2>
            <p>
              To use most aspects of the Services, you must register for and maintain an active personal user account. You must be at least 18 years of age to obtain an account. You are responsible for all activity that occurs under your account.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">3. Use of the Services</h2>
            <p>
              The Services constitute a technology platform that enables users of SwiftRoute's mobile applications or websites to arrange and schedule transportation with independent third-party providers. You agree to comply with all applicable laws when using the Services.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">4. Payment</h2>
            <p>
              You understand that use of the Services may result in charges to you for the services you receive ("Charges"). Charges will be inclusive of applicable taxes where required by law. All Charges are due immediately and payment will be facilitated by SwiftRoute using the preferred payment method designated in your account.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">5. Disclaimers; Limitation of Liability</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." SWIFTROUTE DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS. IN NO EVENT SHALL SWIFTROUTE'S TOTAL LIABILITY TO YOU IN CONNECTION WITH THE SERVICES FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED FIVE HUNDRED U.S. DOLLARS (US $500).
            </p>

             <h2 className="font-semibold text-2xl mt-8 mb-4">6. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of California, U.S.A., without giving effect to any conflict of law principles.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
