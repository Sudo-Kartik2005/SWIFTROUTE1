
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            await signUp(email, password);
            toast({
                title: 'Success!',
                description: 'Your account has been created.',
            });
            router.push('/login');
        } catch (err: any) {
            let errorMessage = "An unexpected error occurred.";
            if (err.code) {
                switch(err.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email address is already in use.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Please enter a valid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'The password is too weak. Please choose a stronger password.';
                        break;
                    default:
                        errorMessage = 'Registration failed. Please try again later.';
                        break;
                }
            }
            setError(errorMessage);
            toast({
                variant: 'destructive',
                title: 'Registration Failed',
                description: errorMessage,
            });
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-sm shadow-2xl animate-in fade-in-50">
                <CardHeader className="text-center">
                    <UserPlus className="mx-auto h-12 w-12 mb-4" />
                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                    <CardDescription>Join SwiftRoute to start booking rides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
