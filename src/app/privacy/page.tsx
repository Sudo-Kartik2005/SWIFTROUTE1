
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex-1 w-full bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-lg shadow-lg">
          <div className="text-center mb-12">
            <Lock className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Last Updated: August 8, 2024</p>
          </div>

          <div className="prose prose-lg max-w-none text-card-foreground">
            <h2 className="font-semibold text-2xl mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">2. Location Information</h2>
            <p>
             When you use the Services for transportation, we collect precise location data about the trip from the SwiftRoute app used by the Driver. If you permit the SwiftRoute app to access location services through the permission system used by your mobile operating system, we may also collect the precise location of your device when the app is running in the foreground or background.
            </p>
            
            <h2 className="font-semibold text-2xl mt-8 mb-4">3. How We Use Information</h2>
            <p>
              We may use the information we collect about you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request, and develop new features.</li>
                <li>Perform internal operations, including, for example, to prevent fraud and abuse of our Services; to troubleshoot software bugs and operational problems; to conduct data analysis, testing, and research; and to monitor and analyze usage and activity trends.</li>
                <li>Send or facilitate communications between you and a Driver, such as estimated times of arrival (ETAs).</li>
            </ul>

            <h2 className="font-semibold text-2xl mt-8 mb-4">4. Sharing of Information</h2>
            <p>
              We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including with other users (like drivers) to enable them to provide the Services you request.
            </p>

            <h2 className="font-semibold text-2xl mt-8 mb-4">5. Your Choices</h2>
            <p>
              You may correct your account information at any time by logging into your online or in-app account. If you wish to cancel your account, please email us. Please note that in some cases we may retain certain information about you as required by law, or for legitimate business purposes to the extent permitted by law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
