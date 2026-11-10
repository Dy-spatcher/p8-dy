
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Truck, ShieldCheck } from "lucide-react";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE - BRANDING */}
        <section className="relative bg-[#172554] text-white p-8 md:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[600px]">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-[#FF6B35] p-3 rounded-xl">
                <Package size={28} />
              </div>
              <h1 className="text-2xl font-bold tracking-wide">
                SwiftDrop
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
              Delivering happiness, one package at a time.
            </h2>

            <p className="text-blue-100 leading-relaxed">
              Fast, safe, and reliable delivery services.
              Your packages are always in good hands.
            </p>
          </div>

          <div className="hidden md:block space-y-6 mt-12">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Truck className="text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-blue-200">
                  Deliveries made simple and convenient.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <ShieldCheck className="text-[#FF6B35]" />
              </div>
              <div>
                <h3 className="font-semibold">Safe and Secure</h3>
                <p className="text-sm text-blue-200">
                  Your packages are our priority.
                </p>
              </div>
            </div>
          </div>

          <p className="hidden md:block text-xs text-blue-300 mt-12">
            © 2026 SwiftDrop. All rights reserved.
          </p>
        </section>

        {/* RIGHT SIDE - LOGIN FORM */}
        <section className="flex items-center justify-center p-6 sm:p-10 md:p-12">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="px-0 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Package className="text-[#FF6B35]" size={25} />
              </div>

              <CardTitle className="text-3xl font-bold text-[#172554]">
                Welcome Back!
              </CardTitle>

              <CardDescription className="text-slate-500">
                Login to manage and track your deliveries.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="px-0 space-y-5">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#172554] font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 rounded-lg border-slate-300 focus-visible:ring-[#FF6B35]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#172554] font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-lg border-slate-300 focus-visible:ring-[#FF6B35]"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="px-0 flex flex-col gap-5 mt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#FF6B35] hover:bg-[#E85A25] text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? "Logging in..." : "Login to Your Account"}
                </Button>

                <p className="text-sm text-center text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    href={CONFIG.ROUTES.REGISTER}
                    className="text-[#FF6B35] font-semibold hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </section>
      </div>
    </main>
  );
}
