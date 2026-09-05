"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", allocated: 65, maintenance: 12, value: 1.2 },
  { month: "Feb", allocated: 78, maintenance: 15, value: 1.4 },
  { month: "Mar", allocated: 90, maintenance: 8, value: 1.6 },
  { month: "Apr", allocated: 105, maintenance: 18, value: 1.9 },
  { month: "May", allocated: 125, maintenance: 10, value: 2.1 },
  { month: "Jun", allocated: 142, maintenance: 14, value: 2.4 },
];

export default function AnalyticsChart() {
  return (
    <div className="glass-card p-6 h-80 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white text-base">Fleet Lifecycle Velocity</h3>
          <p className="text-xs text-slate-400">Monthly allocations vs maintenance load</p>
        </div>
        <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md">
          +18.4% YoY Growth
        </span>
      </div>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAllocated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e0572e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#e0572e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMaintenance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#151824",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="allocated"
              stroke="#e0572e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAllocated)"
              name="Active Allocations"
            />
            <Area
              type="monotone"
              dataKey="maintenance"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMaintenance)"
              name="Maintenance Tickets"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
