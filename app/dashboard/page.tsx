
"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  LogOut,
  ArrowUpRight,
  PackageCheck,
  MapPin,
  LayoutDashboard,
  Activity,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CircleDot,
} from "lucide-react";

const statistics = [
  {
    title: "Total Orders",
    value: "—",
    description: "Awaiting order data",
    icon: Package,
    iconStyle: "bg-orange-50 text-[#FF6B35]",
    accent: "border-l-[#FF6B35]",
  },
  {
    title: "Pending Deliveries",
    value: "—",
    description: "Awaiting delivery data",
    icon: Clock,
    iconStyle: "bg-blue-50 text-blue-600",
    accent: "border-l-blue-500",
  },
  {
    title: "Completed Deliveries",
    value: "—",
    description: "Awaiting delivery data",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600",
    accent: "border-l-emerald-500",
  },
];

const quickAccess = [
  {
    title: "Manage Orders",
    description: "View and organize customer orders in one place.",
    subtitle: "Order Management",
    icon: PackageCheck,
    iconStyle: "bg-orange-50 text-[#FF6B35]",
    number: "01",
  },
  {
    title: "Manage Deliveries",
    description: "Monitor delivery progress and order statuses.",
    subtitle: "Delivery Management",
    icon: Truck,
    iconStyle: "bg-blue-50 text-blue-600",
    number: "02",
  },
  {
    title: "Track Packages",
    description: "Keep track of package delivery information.",
    subtitle: "Package Tracking",
    icon: MapPin,
    iconStyle: "bg-emerald-50 text-emerald-600",
    number: "03",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
          <Package className="text-[#FF6B35] animate-pulse" size={30} />
        </div>
        <div className="text-center">
          <p className="font-semibold text-[#172554]">
            SwiftDrop
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  return (
    <main className="min-h-screen bg-[#F5F7FB]">

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#FF6B35] rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              <Package size={25} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#172554]">
                SwiftDrop
              </h1>
              <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-medium">
                Delivery Management
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-700">
                System Active
              </span>
            </div>

            <Button
              onClick={handleLogout}
              className="h-10 px-4 bg-[#172554] hover:bg-[#243b72] text-white rounded-xl gap-2 shadow-sm transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 space-y-9">

        {/* PAGE HEADING */}
        <section className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
              <LayoutDashboard size={17} />
              <span className="text-xs font-bold uppercase tracking-[2px]">
                Main Workspace
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
              Dashboard Overview
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Monitor and manage your delivery operations.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Activity size={23} className="text-[#FF6B35]" />
          </div>
        </section>

        {/* WELCOME BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#0f172a] p-7 sm:p-10 lg:p-12 shadow-xl shadow-blue-950/10">

          {/* DECORATIVE BACKGROUND */}
          <div className="absolute -top-24 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-40 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="absolute right-[-20px] bottom-[-35px] text-white/[0.06]">
            <Truck size={300} strokeWidth={1.2} />
          </div>

          <div className="relative z-10 max-w-2xl">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-100 text-xs mb-6">
              <Sparkles size={14} className="text-[#FF8A5B]" />
              Your delivery management workspace
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Welcome Back!
            </h2>

            <p className="text-blue-100/80 text-sm sm:text-base leading-7 mt-4 max-w-xl">
              Everything you need to manage your orders and
              deliveries is right here. Keep your operations
              organized with SwiftDrop.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">

              <div className="inline-flex items-center gap-2 bg-[#FF6B35] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-lg shadow-orange-500/20">
                <Package size={18} />
                SwiftDrop Workspace
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-blue-100 text-sm">
                <ShieldCheck size={17} />
                Secure Management
              </div>

            </div>
          </div>
        </section>

        {/* DELIVERY STATISTICS */}
        <section className="space-y-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#172554]">
                Delivery Overview
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Summary of your delivery activities.
              </p>
            </div>

            <span className="hidden sm:inline-flex items-center gap-2 text-xs text-slate-400">
              <CircleDot size={13} />
              Live data pending
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card
                  key={stat.title}
                  className={`border border-slate-200/80 border-l-4 ${stat.accent} rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white`}
                >
                  <CardContent className="p-6">

                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>

                        <h3 className="text-4xl font-bold text-[#172554] mt-4 tracking-tight">
                          {stat.value}
                        </h3>
                      </div>

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconStyle}`}>
                        <Icon size={25} />
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400">
                        {stat.description}
                      </p>
                    </div>

                  </CardContent>
                </Card>
              );
            })}

          </div>
        </section>

        {/* QUICK ACCESS */}
        <section className="space-y-5">

          <div>
            <h2 className="text-xl font-bold text-[#172554]">
              Quick Access
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore your delivery management features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {quickAccess.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white overflow-hidden"
                >
                  <CardHeader className="p-6 pb-3">

                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-13 h-13 p-3 rounded-xl flex items-center justify-center ${item.iconStyle}`}>
                        <Icon size={26} />
                      </div>

                      <span className="text-xs font-bold text-slate-300 tracking-widest">
                        {item.number}
                      </span>
                    </div>

                    <CardTitle className="text-lg text-[#172554] font-bold">
                      {item.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent className="px-6 pb-6">

                    <p className="text-sm text-slate-500 leading-relaxed min-h-10">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                      <span className="text-xs font-semibold text-[#FF6B35]">
                        {item.subtitle}
                      </span>

                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
                        <ArrowRight
                          size={16}
                          className="text-[#FF6B35] group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>

                  </CardContent>
                </Card>
              );
            })}

          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section>
          <Card className="border border-slate-200/80 rounded-2xl shadow-sm bg-white overflow-hidden">

            <CardHeader className="p-6 sm:p-7 border-b border-slate-100">
              <div className="flex items-center justify-between gap-3">

                <div>
                  <CardTitle className="text-lg text-[#172554] font-bold">
                    Recent Delivery Activity
                  </CardTitle>

                  <p className="text-sm text-slate-500 mt-2">
                    Stay updated with your latest delivery activities.
                  </p>
                </div>

                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Activity size={22} className="text-[#FF6B35]" />
                </div>

              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-10">

              <div className="flex flex-col items-center justify-center text-center py-7">

                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                    <Package size={37} className="text-[#FF6B35]" />
                  </div>

                  <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                    <Clock size={15} className="text-slate-400" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#172554]">
                  No Recent Activity
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed">
                  Your delivery updates will appear here once
                  activity data is connected to your system.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-xs text-slate-400">
                  <CircleDot size={12} />
                  Waiting for activity
                </div>

              </div>

            </CardContent>
          </Card>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 pb-8 border-t border-slate-200">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                <Package size={17} className="text-white" />
              </div>

              <span className="font-bold text-[#172554]">
                SwiftDrop
              </span>
            </div>

            <p className="text-xs text-slate-400 text-center">
              © 2026 SwiftDrop. All rights reserved.
            </p>

            <p className="text-xs text-slate-400">
              Fast. Safe. Reliable.
            </p>

          </div>

        </footer>

      </div>
    </main>
  );
}
