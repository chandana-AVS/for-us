"use client";

import { useState } from "react";
import {
  BarChart3,
  Download,
  PieChart as PieIcon,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const pieData = [
  { name: "IT Hardware", value: 65, color: "#e0572e" },
  { name: "Networking", value: 25, color: "#3b82f6" },
  { name: "AV & Production", value: 15, color: "#a855f7" },
  { name: "Lab Equipment", value: 20, color: "#10b981" },
];

const barData = [
  { dept: "Engineering", active: 184, maintenance: 12, cost: "$840k" },
  { dept: "Design", active: 65, maintenance: 4, cost: "$310k" },
  { dept: "DevOps", active: 92, maintenance: 8, cost: "$490k" },
  { dept: "Product", active: 45, maintenance: 2, cost: "$180k" },
];

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              EXECUTIVE BUSINESS INTELLIGENCE
            </Badge>
            <span className="text-xs text-slate-400">• Financial & Utilization Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-orange-500" /> Enterprise Analytics & Reports
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleDownload}
            className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
          >
            {downloading ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" /> Generating Report...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Export Executive PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution Pie */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-orange-500" /> Asset Category Distribution
              </h3>
              <p className="text-xs text-slate-400">Inventory split across equipment types</p>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151824",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend formatter={(value) => <span className="text-xs text-slate-300">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Asset & Maintenance Bar Chart */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" /> Department Allocation & Maintenance
              </h3>
              <p className="text-xs text-slate-400">Active inventory vs repair burden per dept</p>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="dept" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151824",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Active Fleet" />
                <Bar dataKey="maintenance" fill="#ef4444" radius={[4, 4, 0, 0]} name="Maintenance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
