import { Activity, ShieldAlert, ArrowUpRight, Wrench, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  action: string;
  entity: string;
  user: string;
  timestamp: string;
  type?: "info" | "warning" | "success";
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "warning":
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <h3 className="font-semibold text-lg text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          Audit Activity Feed
        </h3>
        <span className="text-xs text-slate-400">Live immutable logs</span>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3.5 group">
            <div className="p-2 rounded-full bg-white/5 border border-white/10 shrink-0 group-hover:border-orange-500/30 transition-colors">
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 leading-snug">
                <span className="font-semibold text-white">{item.user}</span>{" "}
                <span className="text-slate-400">{item.action}</span>{" "}
                <span className="text-orange-400 font-medium">{item.entity}</span>
              </p>
              <span className="text-xs text-slate-500 block mt-1">
                {formatDate(item.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
