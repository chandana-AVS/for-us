"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Search,
  Building,
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

interface AuditCycle {
  id: string;
  cycleName: string;
  department: string;
  startDate: string;
  endDate: string;
  totalItems: number;
  verifiedCount: number;
  missingCount: number;
  status: "DRAFT" | "IN_PROGRESS" | "CLOSED";
}

const mockAuditCycles: AuditCycle[] = [
  {
    id: "audit-1",
    cycleName: "2026 Q3 Engineering Physical Verification",
    department: "Engineering",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    totalItems: 140,
    verifiedCount: 132,
    missingCount: 2,
    status: "IN_PROGRESS",
  },
  {
    id: "audit-2",
    cycleName: "2026 Q2 Company-Wide Hardware Inventory",
    department: "All Departments",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    totalItems: 850,
    verifiedCount: 848,
    missingCount: 2,
    status: "CLOSED",
  },
];

export default function AuditsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  const filteredCycles = mockAuditCycles.filter(
    (a) =>
      a.cycleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              AUDIT COMPLIANCE MODULE
            </Badge>
            <span className="text-xs text-slate-400">• Physical vs System Verification</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-amber-500" /> Physical Asset Audits & Scans
          </h1>
        </div>

        <Button
          onClick={() => setIsAuditOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4" /> Start Audit Cycle
        </Button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>INVENTORY ACCURACY</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">99.2%</div>
          <p className="text-xs text-slate-500 mt-1">Verified physical assets</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>OPEN DISCREPANCIES</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-rose-400 stat-mono">4 Items</div>
          <p className="text-xs text-slate-500 mt-1">Requires location investigation</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>ACTIVE AUDIT CYCLES</span>
            <Building className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">1 Active</div>
          <p className="text-xs text-slate-500 mt-1">Target completion: Aug 31</p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search audit cycle or department..."
            className="pl-9 bg-black/30 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Audit Cycles Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Audit Cycles Ledger</h3>
          <span className="text-xs text-slate-400">{filteredCycles.length} Cycle(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Audit Cycle Name</th>
                <th className="px-6 py-3.5">Scope Dept</th>
                <th className="px-6 py-3.5">Progress</th>
                <th className="px-6 py-3.5">Missing</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCycles.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium block">{c.cycleName}</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {c.startDate} → {c.endDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{c.department}</td>
                  <td className="px-6 py-4">
                    <span className="text-white font-mono text-xs font-semibold">
                      {c.verifiedCount} / {c.totalItems} Units
                    </span>
                    <div className="w-32 bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${(c.verifiedCount / c.totalItems) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.missingCount > 0 ? (
                      <span className="text-rose-400 font-bold font-mono text-xs">
                        {c.missingCount} Missing
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-xs">0 Discrepancies</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {c.status === "IN_PROGRESS" && (
                      <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30">
                        IN PROGRESS
                      </Badge>
                    )}
                    {c.status === "CLOSED" && (
                      <Badge className="bg-slate-500/15 text-slate-400 border-slate-500/30">
                        CLOSED & SEALED
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Verify Items
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Audit Modal */}
      <Dialog open={isAuditOpen} onOpenChange={setIsAuditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Initiate New Audit Cycle</DialogTitle>
            <DialogDescription>
              Launch physical verification scan cycle for departments or locations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Audit Cycle Name
              </label>
              <Input placeholder="e.g. 2026 Q3 Hardware Audit" className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Scope Department / Location
              </label>
              <Input placeholder="Engineering / HQ Server Room" className="bg-black/40" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Start Date
                </label>
                <Input type="date" className="bg-black/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  End Date
                </label>
                <Input type="date" className="bg-black/40" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAuditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsAuditOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Start Cycle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
