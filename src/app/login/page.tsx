
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await signIn(email, password);
            router.push('/profile');
        } catch (err: any) {
            let errorMessage = "An unexpected error occurred.";
            if (err.code) {
                switch (err.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password. Please try again.';
                        break;
                    case 'auth/configuration-not-found':
                         errorMessage = 'Authentication is not configured. Please enable Email/Password sign-in in your Firebase project.';
                         break;
                    default:
                        errorMessage = `Login failed: ${err.message}`;
                        break;
                }
            }
            setError(errorMessage);
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: errorMessage,
            });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 relative">
             <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1920&h=1080&auto=format&fit=crop"
                alt="City background"
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0 z-0 opacity-20"
                data-ai-hint="city street"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
            <Card className="w-full max-w-sm shadow-2xl animate-in fade-in-50 z-10 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground p-3 rounded-full mb-4">
                        <LogIn className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="underline text-accent font-semibold">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
