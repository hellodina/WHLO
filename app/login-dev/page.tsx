"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DevLoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await signIn("dev", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Error signing in. Please try again.");
      } else if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#E6F1FF] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-[#112240] border-[#233554]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#E6F1FF]">
            Welcome to WHLO
          </CardTitle>
          <p className="text-[#8892B0] mt-2">
            Development Mode - Enter any email to sign in
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#E6F1FF] mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-[#0A192F] border-[#233554] text-[#E6F1FF] placeholder:text-[#8892B0] focus:border-[#FF4500]"
                required
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes('Error') 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}>
                {message}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <p className="text-xs text-[#8892B0] mt-4 text-center">
            This is a development login. No email verification required.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
