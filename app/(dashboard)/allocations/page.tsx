"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  Plus,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  Search,
  Filter,
  ArrowUpRight,
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

interface Allocation {
  id: string;
  assetTag: string;
  assetName: string;
  targetType: "EMPLOYEE" | "DEPARTMENT";
  assignedTo: string;
  department: string;
  allocatedDate: string;
  expectedReturnDate: string;
  status: "ACTIVE" | "OVERDUE" | "RETURNED";
}

const mockAllocations: Allocation[] = [
  {
    id: "alloc-1",
    assetTag: "AST-0001",
    assetName: 'MacBook Pro 16" M3 Max',
    targetType: "EMPLOYEE",
    assignedTo: "Sarah Chen",
    department: "Engineering",
    allocatedDate: "2026-01-15",
    expectedReturnDate: "2026-12-31",
    status: "ACTIVE",
  },
  {
    id: "alloc-2",
    assetTag: "AST-0002",
    assetName: 'Dell UltraSharp 32" 4K Monitor',
    targetType: "DEPARTMENT",
    assignedTo: "Design Lab #3",
    department: "Design",
    allocatedDate: "2025-11-01",
    expectedReturnDate: "2026-06-01",
    status: "ACTIVE",
  },
  {
    id: "alloc-3",
    assetTag: "AST-0005",
    assetName: "iPad Pro 12.9 WiFi 512GB",
    targetType: "EMPLOYEE",
    assignedTo: "David Kim",
    department: "Product Management",
    allocatedDate: "2025-08-10",
    expectedReturnDate: "2026-02-15",
    status: "OVERDUE",
  },
];

export default function AllocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

  const filteredAllocations = mockAllocations.filter(
    (item) =>
      item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-transparent to-orange-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              WORKFLOW ENGINE ACTIVE
            </Badge>
            <span className="text-xs text-slate-400">• Employee & Dept Custody Chain</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-blue-500" /> Asset Allocations & Custody
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsAllocateOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" /> New Allocation
          </Button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>ACTIVE CUSTODY</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">1,180</div>
          <p className="text-xs text-slate-500 mt-1">94% of available inventory</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>OVERDUE RETURNS</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-rose-400 stat-mono">12</div>
          <p className="text-xs text-slate-500 mt-1">Requires supervisor escalation</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>DEPARTMENT POOLS</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">248</div>
          <p className="text-xs text-slate-500 mt-1">Shared team equipment</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search by tag, asset, assigned employee..."
            className="pl-9 bg-black/30 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="gap-2 border-white/10">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter Status
          </Button>
        </div>
      </div>

      {/* Allocation Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Active Custody Register</h3>
          <span className="text-xs text-slate-400">{filteredAllocations.length} Record(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Asset Tag & Name</th>
                <th className="px-6 py-3.5">Target Type</th>
                <th className="px-6 py-3.5">Assigned Custodian</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Assigned Date</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAllocations.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-orange-400 font-mono font-semibold text-xs block">
                      {item.assetTag}
                    </span>
                    <span className="text-white font-medium block">{item.assetName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[11px] border-white/10">
                      {item.targetType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{item.assignedTo}</td>
                  <td className="px-6 py-4 text-slate-400">{item.department}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                    {item.allocatedDate}
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "ACTIVE" && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                        ACTIVE CUSTODY
                      </Badge>
                    )}
                    {item.status === "OVERDUE" && (
                      <Badge className="bg-rose-500/15 text-rose-400 border-rose-500/30">
                        OVERDUE
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Return / Transfer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Allocation Modal */}
      <Dialog open={isAllocateOpen} onOpenChange={setIsAllocateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Issue New Asset Allocation</DialogTitle>
            <DialogDescription>
              Assign asset custody to an employee or department account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Select Available Asset Tag
              </label>
              <Input placeholder="Search AST-xxxx..." className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Assignee Employee / Department
              </label>
              <Input placeholder="Enter employee name or department" className="bg-black/40" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Allocation Date
                </label>
                <Input type="date" className="bg-black/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Expected Return
                </label>
                <Input type="date" className="bg-black/40" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAllocateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsAllocateOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm Allocation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
