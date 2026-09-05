import Link from "next/link";
import { ShieldCheck, Zap, Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-white selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="h-20 px-8 border-b border-white/10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-white">StarterOps</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">Launch Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-20 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <Zap className="w-4 h-4" /> Hackathon Production Starter Pack
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-tight">
          Enterprise ERP & Resource Management Platform
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Production-grade Next.js 15 starter kit featuring role-scoped dashboards, 10 functional modules, Prisma ORM, and OpenTelemetry observability.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2 font-semibold text-base shadow-xl shadow-orange-500/20">
              Explore Live Demo <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-white/15 text-slate-300 font-semibold text-base">
              Role Switcher (Admin / Manager / User)
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <div className="glass-card p-6 border-white/10">
            <ShieldCheck className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Granular RBAC Security</h3>
            <p className="text-slate-400 text-sm">
              Role-scoped data access for Admin, Department Head, and Employee tiers with server middleware enforcement.
            </p>
          </div>

          <div className="glass-card p-6 border-white/10">
            <Activity className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Immutable Audit Trails</h3>
            <p className="text-slate-400 text-sm">
              Automatic change tracking across all database entities with IP logging and historical snapshot diffing.
            </p>
          </div>

          <div className="glass-card p-6 border-white/10">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">10 Turnkey Modules</h3>
            <p className="text-slate-400 text-sm">
              Asset tracking, bookings, state-machine maintenance tickets, transfers, and real-time report analytics.
            </p>
          </div>
        </div>
      </main>

      <footer className="h-16 border-t border-white/10 flex items-center justify-center text-xs text-slate-500">
        © 2026 StarterOps Engine • Engineered for Odoo Hackathons
      </footer>
    </div>
  );
}
