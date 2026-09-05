"use client";

import { useState } from "react";
import {
  Box,
  CheckCircle,
  Wrench,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import ActivityFeed, { ActivityItem } from "@/components/dashboard/ActivityFeed";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Button } from "@/components/ui/button";

const mockActivityLogs: ActivityItem[] = [
  {
    id: "1",
    user: "Alex Rivera",
    action: "approved maintenance ticket for",
    entity: "MacBook Pro M3 (AST-0042)",
    timestamp: new Date().toISOString(),
    type: "warning",
  },
  {
    id: "2",
    user: "Sarah Chen",
    action: "allocated resource to Engineering dept",
    entity: "Dell UltraSharp 32\" (AST-0108)",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "info",
  },
  {
    id: "3",
    user: "Marcus Vance",
    action: "completed physical audit cycle",
    entity: "HQ Server Room Batch #12",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "success",
  },
];

export default function DashboardPage() {
  const [roleTier, setRoleTier] = useState<"ADMIN" | "MANAGER" | "USER">("ADMIN");

  return (
    <div className="space-y-8">
      {/* Top Header & Role Switcher Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
              {roleTier} VIEW ACTIVE
            </span>
            <span className="text-xs text-slate-400">• Role-Scoped Executive KPI Wall</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Enterprise Asset Intelligence
          </h1>
        </div>

        {/* Live Role Switcher for Hackathon Judges */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-orange-400" /> Switch Scope:
          </span>
          {(["ADMIN", "MANAGER", "USER"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleTier(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleTier === role
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          label={roleTier === "USER" ? "My Assigned Assets" : "Total Tracked Assets"}
          value={roleTier === "USER" ? "4 Units" : "1,428"}
          change="12%"
          icon={Box}
          color="orange"
        />
        <KPICard
          label={roleTier === "USER" ? "Active Bookings" : "Allocated & Active"}
          value={roleTier === "USER" ? "2 Slots" : "1,180"}
          change="8%"
          icon={CheckCircle}
          color="blue"
        />
        <KPICard
          label="Pending Maintenance"
          value={roleTier === "USER" ? "1 Ticket" : "14 Tickets"}
          change="-4%"
          isPositive={false}
          icon={Wrench}
          color="emerald"
        />
        <KPICard
          label={roleTier === "USER" ? "Depreciation Value" : "Total Fleet Valuation"}
          value={roleTier === "USER" ? "$4,200" : "$2.4M"}
          change="18%"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Analytics Chart & Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed items={mockActivityLogs} />
        </div>
      </div>

      {/* Control Panel & Production Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-lg text-white mb-4 flex items-center justify-between">
            <span>Quick Action Control Panel</span>
            <span className="text-xs text-slate-500">RBAC Filtered Actions</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
              <Plus className="w-4 h-4" /> Register New Asset
            </Button>
            <Button variant="outline" className="gap-2">
              <ArrowUpRight className="w-4 h-4" /> Request Asset Transfer
            </Button>
            <Button variant="outline" className="gap-2">
              <Wrench className="w-4 h-4" /> Raise Repair Ticket
            </Button>
            <Button variant="secondary" className="gap-2">
              <TrendingUp className="w-4 h-4" /> Generate Audit Report
            </Button>
          </div>
        </div>

        {/* System Performance Widget */}
        <div className="lg:col-span-1 glass-card p-6 border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-base">Production Health</h4>
              <p className="text-xs text-slate-400">OpenTelemetry + Postgres</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
              Operational
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center border-t border-white/10 pt-4">
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">DB Latency</span>
              <span className="text-base font-bold text-white stat-mono">14ms</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Cache Hit</span>
              <span className="text-base font-bold text-white stat-mono">98%</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Traces</span>
              <span className="text-base font-bold text-white stat-mono">4.1k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
