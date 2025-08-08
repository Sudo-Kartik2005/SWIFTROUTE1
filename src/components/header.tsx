'use client';

import Link from 'next/link';
import { Car, LogOut, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };
  
  const commonLinks = (
    <>
      <Button variant="ghost" asChild>
          <Link href="/#how-it-works" className="text-sm font-medium">How it works</Link>
      </Button>
      <Button variant="ghost" asChild>
          <Link href="#" className="text-sm font-medium">Drive with SwiftRoute</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/help" className="text-sm font-medium">Help</Link>
      </Button>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">SwiftRoute</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-1">
          {commonLinks}
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/profile" className="text-sm font-medium">
                  My Trips
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="text-sm font-medium">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" className="text-sm font-medium">
                  Log In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register" className="text-sm font-medium">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
           <LanguageSelector />
        </nav>
        <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <Menu />
                      <span className="sr-only">Toggle Menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="right" className='w-full'>
                <div className="flex flex-col space-y-4 pt-8">
                  {commonLinks}
                  {user ? (
                    <>
                      <Button variant="ghost" asChild>
                        <Link href="/profile" className="text-sm font-medium">
                          My Trips
                        </Link>
                      </Button>
                      <Button variant="ghost" onClick={handleSignOut} className="text-sm font-medium">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                     <>
                      <Button variant="ghost" asChild>
                        <Link href="/login" className="text-sm font-medium">
                          Log In
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register" className="text-sm font-medium">
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                  <div className="pt-4 border-t">
                     <LanguageSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}

function LanguageSelector() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Select Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
