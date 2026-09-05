import { History, ShieldCheck, Search } from "lucide-react";
import ActivityFeed, { ActivityItem } from "@/components/dashboard/ActivityFeed";

const auditLogs: ActivityItem[] = [
  {
    id: "1",
    user: "System Admin",
    action: "updated RBAC permission mapping for role",
    entity: "MANAGER",
    timestamp: new Date().toISOString(),
    type: "warning",
  },
  {
    id: "2",
    user: "Alex Rivera",
    action: "approved transfer request for",
    entity: "MacBook Pro M3 (AST-0042)",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "success",
  },
  {
    id: "3",
    user: "Sarah Chen",
    action: "submitted maintenance ticket for",
    entity: "Cisco Catalyst Switch (AST-0003)",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "info",
  },
  {
    id: "4",
    user: "Marcus Vance",
    action: "initiated quarterly asset audit cycle",
    entity: "Cycle #2026-Q1",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    type: "info",
  },
];

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <History className="w-8 h-8 text-orange-500" /> Immutable Activity Logs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            System-wide audit trail recording all user actions, security events, and entity state changes
          </p>
        </div>
      </div>

      <ActivityFeed items={auditLogs} />
    </div>
  );
}
