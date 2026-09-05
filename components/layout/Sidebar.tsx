"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ArrowRightLeft,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  History,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "KPI Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Asset Directory", href: "/assets", icon: Box },
  { name: "Allocations & Transfers", href: "/allocations", icon: ArrowRightLeft },
  { name: "Resource Bookings", href: "/bookings", icon: CalendarDays },
  { name: "Maintenance & Repairs", href: "/maintenance", icon: Wrench },
  { name: "Asset Audits", href: "/audits", icon: ClipboardCheck },
  { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { name: "Activity Logs", href: "/activity-log", icon: History },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "System Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f111a] border-r border-white/10 flex flex-col h-screen shrink-0 sticky top-0">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
            S
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight block leading-tight">
              StarterOps
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
              Enterprise ERP
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-orange-500/15 text-white border border-orange-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-orange-500" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="text-slate-300 font-semibold block">RBAC Guard Active</span>
            <span className="text-slate-500 block text-[11px]">Role Scoped API</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
