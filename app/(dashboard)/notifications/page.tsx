import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  {
    id: "1",
    title: "Maintenance Ticket Approved",
    message: "Your repair ticket for AST-0042 has been assigned to Technician Dave.",
    time: "10 minutes ago",
    type: "success",
    isRead: false,
  },
  {
    id: "2",
    title: "Overdue Return Alert",
    message: "Dell Monitor AST-0002 expected return date was yesterday.",
    time: "2 hours ago",
    type: "warning",
    isRead: false,
  },
  {
    id: "3",
    title: "System Audit Initiated",
    message: "Physical audit cycle 2026-Q1 has started. Please verify assigned items.",
    time: "1 day ago",
    type: "info",
    isRead: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Bell className="w-8 h-8 text-orange-500" /> Notifications Center
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Stay updated on asset assignments, approval requests, and system alerts
        </p>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <div
            key={n.id}
            className={`glass-card p-5 flex items-start gap-4 ${
              !n.isRead ? "border-l-4 border-l-orange-500 bg-white/5" : ""
            }`}
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
              {n.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {n.type === "warning" && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {n.type === "info" && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white text-base">{n.title}</h4>
                <span className="text-xs text-slate-500">{n.time}</span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
