import Link from 'next/link';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">SwiftRoute</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Trips
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/help" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Help
            </Link>
          </Button>
           <Button variant="ghost" asChild>
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/register" className="text-sm font-medium">
              Register
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
