
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
  Package,
  Truck,
  ShieldCheck,
  Eye,
  EyeOff,
  UserRound,
  LockKeyhole,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-4 sm:p-6 font-sans">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_25px_70px_-20px_rgba(15,23,42,0.25)] overflow-hidden grid md:grid-cols-2 min-h-[650px]">

        {/* LEFT SIDE - BRANDING */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#0f172a] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between">

          {/* Decorative Background */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="relative z-10">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-14">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Package size={27} strokeWidth={2.2} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  SwiftDrop
                </h1>
                <p className="text-[10px] tracking-[3px] text-blue-200 uppercase">
                  Delivery Management
                </p>
              </div>
            </div>

            {/* HERO TEXT */}
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-blue-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                Reliable delivery, made simple
              </span>

              <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
                Delivering
                <span className="text-[#FF8A5B]"> happiness, </span>
                one package at a time.
              </h2>

              <p className="text-blue-100/80 text-base leading-7 max-w-sm">
                Manage your deliveries with ease. Track packages,
                organize orders, and keep everything moving
                with SwiftDrop.
              </p>
            </div>

            {/* FEATURES */}
            <div className="mt-14 space-y-6">

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Truck className="text-[#FF8A5B]" size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Fast and Efficient
                  </h3>
                  <p className="text-sm text-blue-200/80 mt-1">
                    Keep your deliveries organized and on schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#FF8A5B]" size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Safe and Secure
                  </h3>
                  <p className="text-sm text-blue-200/80 mt-1">
                    Your account and delivery information matter.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="relative z-10 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-blue-200/60">
            <p>© 2026 SwiftDrop. All rights reserved.</p>
            <p>Delivering with confidence.</p>
          </div>

        </section>

        {/* RIGHT SIDE - LOGIN FORM */}
        <section className="flex items-center justify-center bg-white p-7 sm:p-12 lg:p-16">

          <div className="w-full max-w-md">

            {/* FORM HEADER */}
            <div className="mb-9">

              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-7">
                <Package size={28} className="text-[#FF6B35]" />
              </div>

              <p className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase mb-2">
                Welcome to SwiftDrop
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#172554] tracking-tight">
                Welcome Back!
              </h2>

              <p className="text-slate-500 mt-3 leading-relaxed">
                Sign in to your account to manage and track your deliveries.
              </p>

            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200"
                >
                  {error}
                </div>
              )}

              {/* USERNAME */}
              <div className="space-y-2">

                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-700"
                >
                  Username
                </Label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    disabled={loading}
                    className="h-14 pl-12 rounded-xl border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20 transition-all"
                  />
                </div>

              </div>

              {/* PASSWORD */}
              <div className="space-y-2">

                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="h-14 pl-12 pr-12 rounded-xl border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#FF6B35] focus-visible:ring-[#FF6B35]/20 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-2 bg-[#FF6B35] hover:bg-[#ed5a27] active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Your Account
                    <ArrowRight size={19} className="ml-2" />
                  </>
                )}
              </Button>

            </form>

            {/* REGISTER LINK */}
            <div className="mt-8 pt-7 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  href={CONFIG.ROUTES.REGISTER}
                  className="text-[#FF6B35] font-bold hover:text-[#ed5a27] hover:underline underline-offset-4 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* SECURITY NOTE */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={15} />
              <span>Your account is protected and secure.</span>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
