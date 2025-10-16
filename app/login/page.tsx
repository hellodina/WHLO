"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setMessage("Error sending magic link. Please try again.");
      } else {
        setMessage("Check your email for a magic link to sign in!");
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
          <CardTitle className="text-2xl font-bold text-[#E6F1FF] font-['Space_Grotesk',_'Inter',_sans-serif]">
            Welcome to WHLO
          </CardTitle>
          <p className="text-[#8892B0] mt-2">
            Sign in with your email to access your missions
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
                required
                className="bg-[#0A192F] border-[#233554] text-[#E6F1FF] placeholder:text-[#8892B0] focus:border-[#FF4500]"
              />
            </div>
            
            {message && (
              <div className={`text-sm p-3 rounded-md ${
                message.includes("Check your email") 
                  ? "bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/20" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {message}
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? "Sending..." : "Sign in with Email"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-[#8892B0]">
              We'll send you a magic link to sign in securely
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
