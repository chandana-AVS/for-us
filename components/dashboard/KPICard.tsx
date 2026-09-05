import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: "orange" | "blue" | "emerald" | "purple";
}

export default function KPICard({
  label,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = "orange",
}: KPICardProps) {
  const colorStyles = {
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div className="glass-card p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <div className={cn("p-2 rounded-lg border", colorStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-bold text-white stat-mono tracking-tight">
          {value}
        </div>
        {change && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={cn(
                "text-xs font-semibold px-1.5 py-0.5 rounded",
                isPositive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/15 text-red-400 border border-red-500/20"
              )}
            >
              {isPositive ? `+${change}` : change}
            </span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
