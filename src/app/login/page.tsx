
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-sm shadow-2xl animate-in fade-in-50">
                <CardHeader className="text-center">
                    <LogIn className="mx-auto h-12 w-12 mb-4" />
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
