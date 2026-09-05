"use client";

import { useState } from "react";
import {
  Wrench,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Search,
  Filter,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface MaintenanceTicket {
  id: string;
  ticketNumber: string;
  assetTag: string;
  assetName: string;
  raisedBy: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "PENDING" | "APPROVED" | "IN_PROGRESS" | "RESOLVED";
  issue: string;
  createdAt: string;
}

const mockTickets: MaintenanceTicket[] = [
  {
    id: "m-1",
    ticketNumber: "TICK-8041",
    assetTag: "AST-0003",
    assetName: "Cisco Catalyst 9300 Switch",
    raisedBy: "Sarah Chen",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    issue: "SFP port 3 intermittent connection drop & fan noise",
    createdAt: "2026-08-29",
  },
  {
    id: "m-2",
    ticketNumber: "TICK-8042",
    assetTag: "AST-0009",
    assetName: "Dell PowerEdge R750 Server",
    raisedBy: "Alex Rivera",
    priority: "HIGH",
    status: "PENDING",
    issue: "RAID controller virtual disk degraded warning",
    createdAt: "2026-08-30",
  },
  {
    id: "m-3",
    ticketNumber: "TICK-8038",
    assetTag: "AST-0014",
    assetName: "HP Color LaserJet Enterprise",
    raisedBy: "Marcus Vance",
    priority: "LOW",
    status: "RESOLVED",
    issue: "Toner cartridge replacement & roller calibration",
    createdAt: "2026-08-25",
  },
];

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const filteredTickets = mockTickets.filter(
    (t) =>
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assetTag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-transparent to-orange-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              STATE MACHINE & SLA GUARD
            </Badge>
            <span className="text-xs text-slate-400">• Technician & Approval Lifecycle</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Wrench className="w-8 h-8 text-emerald-500" /> Maintenance & Repair Operations
          </h1>
        </div>

        <Button
          onClick={() => setIsTicketOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4" /> Raise Maintenance Ticket
        </Button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>CRITICAL TICKETS</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-bold text-rose-400 stat-mono">2 Active</div>
          <p className="text-xs text-slate-500 mt-1">SLA response time: &lt; 2 hrs</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>IN REPAIR NOW</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">6 Units</div>
          <p className="text-xs text-slate-500 mt-1">Technicians assigned</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>RESOLVED THIS MONTH</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 stat-mono">48</div>
          <p className="text-xs text-slate-500 mt-1">98.2% first-time fix rate</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search by ticket #, asset tag, description..."
            className="pl-9 bg-black/30 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Service Desk Incident Queue</h3>
          <span className="text-xs text-slate-400">{filteredTickets.length} Ticket(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Ticket # & Asset</th>
                <th className="px-6 py-3.5">Issue Summary</th>
                <th className="px-6 py-3.5">Raised By</th>
                <th className="px-6 py-3.5">Priority</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-orange-400 font-mono font-semibold text-xs block">
                      {t.ticketNumber} ({t.assetTag})
                    </span>
                    <span className="text-white font-medium block">{t.assetName}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{t.issue}</td>
                  <td className="px-6 py-4 text-slate-400">{t.raisedBy}</td>
                  <td className="px-6 py-4">
                    {t.priority === "CRITICAL" && (
                      <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse">
                        CRITICAL
                      </Badge>
                    )}
                    {t.priority === "HIGH" && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40">
                        HIGH
                      </Badge>
                    )}
                    {t.priority === "LOW" && (
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/40">
                        LOW
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {t.status === "PENDING" && (
                      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30">
                        PENDING APPROVAL
                      </Badge>
                    )}
                    {t.status === "IN_PROGRESS" && (
                      <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30">
                        IN PROGRESS
                      </Badge>
                    )}
                    {t.status === "RESOLVED" && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                        RESOLVED
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Manage State
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Maintenance Ticket Modal */}
      <Dialog open={isTicketOpen} onOpenChange={setIsTicketOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Maintenance Ticket</DialogTitle>
            <DialogDescription>
              Report hardware faults, routine servicing, or repairs.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Target Asset Tag
              </label>
              <Input placeholder="Enter AST-xxxx..." className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Priority Level
              </label>
              <Input placeholder="LOW / MEDIUM / HIGH / CRITICAL" className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Issue Description & Fault Symptoms
              </label>
              <Input placeholder="Detailed fault description..." className="bg-black/40" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsTicketOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsTicketOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Submit Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
