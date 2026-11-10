
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
  ArrowRight,
  PackageCheck,
  MapPin,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">
          Verifying session...
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  return (
    <main className="min-h-screen bg-slate-100">

      {/* NAVIGATION BAR */}
      <header className="bg-[#172554] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="bg-[#FF6B35] p-2.5 rounded-xl">
              <Package size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-wide">
                SwiftDrop
              </h1>
              <p className="text-xs text-blue-200">
                Delivery Management System
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-[#FF6B35] hover:bg-[#E85A25] text-white gap-2"
          >
            <LogOut size={17} />
            Logout
          </Button>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">

        {/* WELCOME SECTION */}
        <section className="bg-[#172554] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-orange-300 mb-3">
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">
                Dashboard Overview
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome Back!
            </h2>

            <p className="text-blue-100 leading-relaxed mb-6">
              Manage your deliveries and keep track of your
              packages in one convenient place. SwiftDrop makes
              delivery management easier and faster.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#FF6B35] px-5 py-3 rounded-lg text-sm font-semibold">
              <Package size={18} />
              Delivery Management System
            </div>
          </div>

          <div className="absolute right-[-30px] bottom-[-50px] opacity-10">
            <Truck size={280} />
          </div>

        </section>

        {/* STATISTICS */}
        <section className="space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[#172554]">
              Delivery Overview
            </h2>
            <p className="text-sm text-slate-500">
              Summary of your delivery activities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* TOTAL ORDERS */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Total Orders
                  </p>
                  <h3 className="text-3xl font-bold text-[#172554] mt-2">
                    —
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Awaiting order data
                  </p>
                </div>

                <div className="bg-orange-100 p-4 rounded-xl">
                  <Package className="text-[#FF6B35]" size={28} />
                </div>
              </CardContent>
            </Card>

            {/* PENDING DELIVERIES */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Pending Deliveries
                  </p>
                  <h3 className="text-3xl font-bold text-[#172554] mt-2">
                    —
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Awaiting delivery data
                  </p>
                </div>

                <div className="bg-blue-100 p-4 rounded-xl">
                  <Clock className="text-blue-600" size={28} />
                </div>
              </CardContent>
            </Card>

            {/* COMPLETED DELIVERIES */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Completed Deliveries
                  </p>
                  <h3 className="text-3xl font-bold text-[#172554] mt-2">
                    —
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Awaiting delivery data
                  </p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl">
                  <CheckCircle2 className="text-green-600" size={28} />
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* QUICK ACCESS */}
        <section className="space-y-4">

          <div>
            <h2 className="text-xl font-bold text-[#172554]">
              Quick Access
            </h2>
            <p className="text-sm text-slate-500">
              Your delivery management shortcuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Card className="border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                  <PackageCheck className="text-[#FF6B35]" size={25} />
                </div>
                <CardTitle className="text-[#172554]">
                  Manage Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  View and organize customer orders.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-semibold mt-4">
                  Order Management
                  <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                  <Truck className="text-blue-600" size={25} />
                </div>
                <CardTitle className="text-[#172554]">
                  Manage Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Monitor delivery progress and status.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-semibold mt-4">
                  Delivery Management
                  <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                  <MapPin className="text-green-600" size={25} />
                </div>
                <CardTitle className="text-[#172554]">
                  Track Packages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Keep track of package delivery information.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B35] text-sm font-semibold mt-4">
                  Package Tracking
                  <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section>
          <Card className="border-0 shadow-sm rounded-xl">

            <CardHeader>
              <CardTitle className="text-[#172554]">
                Recent Delivery Activity
              </CardTitle>
              <p className="text-sm text-slate-500">
                Latest updates from your delivery system.
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <Package className="text-[#FF6B35]" size={32} />
                </div>

                <h3 className="font-semibold text-[#172554]">
                  No Recent Activity
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Your delivery updates will appear here
                  once activity data is connected.
                </p>
              </div>
            </CardContent>

          </Card>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-5 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © 2026 SwiftDrop. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Fast, Safe, and Reliable Delivery.
          </p>
        </footer>

      </div>
    </main>
  );
}
