
import Link from "next/link";
import { Car, Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                           <Car className="h-8 w-8" />
                           <span className="font-bold text-2xl">SwiftRoute</span>
                        </Link>
                        <p className="text-sm text-primary-foreground/80">Your ride, on-demand.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:underline text-primary-foreground/80">About Us</Link></li>
                            <li><Link href="/careers" className="hover:underline text-primary-foreground/80">Careers</Link></li>
                            <li><Link href="/help" className="hover:underline text-primary-foreground/80">Help</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="hover:underline text-primary-foreground/80">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:underline text-primary-foreground/80">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Twitter /></Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Facebook /></Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Instagram /></Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
                    <p>&copy; {new Date().getFullYear()} SwiftRoute Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
