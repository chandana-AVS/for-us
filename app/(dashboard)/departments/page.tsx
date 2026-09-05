"use client";

import { useState } from "react";
import { Building2, Plus, Users, Shield, Layers, Search } from "lucide-react";
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

interface Department {
  id: string;
  name: string;
  description: string;
  headUser: string;
  employeeCount: number;
  assetCount: number;
  parentDepartment?: string;
}

const mockDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Engineering",
    description: "Core software engineering, platform infrastructure & R&D",
    headUser: "Alex Rivera",
    employeeCount: 42,
    assetCount: 184,
  },
  {
    id: "dept-2",
    name: "Design & UX",
    description: "Product design, brand identity, user research",
    headUser: "Elena Rostova",
    employeeCount: 18,
    assetCount: 65,
  },
  {
    id: "dept-3",
    name: "DevOps & Cloud Security",
    description: "Infrastructure management, CI/CD pipelines & telemetry",
    headUser: "Marcus Vance",
    employeeCount: 12,
    assetCount: 92,
    parentDepartment: "Engineering",
  },
];

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeptOpen, setIsDeptOpen] = useState(false);

  const filteredDepts = mockDepartments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-transparent to-orange-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              ORGANIZATION MATRIX ENGINE
            </Badge>
            <span className="text-xs text-slate-400">• Hierarchical Cost Center & Department Scoping</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-500" /> Departments & Org Structure
          </h1>
        </div>

        <Button
          onClick={() => setIsDeptOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4" /> Create Department
        </Button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>TOTAL DEPARTMENTS</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">14 Units</div>
          <p className="text-xs text-slate-500 mt-1">Cross-functional teams</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>TOTAL HEADCOUNT</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 stat-mono">186 Employees</div>
          <p className="text-xs text-slate-500 mt-1">Active user accounts</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>DEPARTMENT CUSTODY</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">$1.8M Assets</div>
          <p className="text-xs text-slate-500 mt-1">Valuation under dept heads</p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search department name or description..."
            className="pl-9 bg-black/30 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDepts.map((d) => (
          <div key={d.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  {d.parentDepartment ? `Sub of ${d.parentDepartment}` : "Primary Unit"}
                </span>
                <span className="text-xs text-slate-400 font-mono">{d.employeeCount} Members</span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">{d.name}</h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{d.description}</p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Department Head:</span>
                <span className="text-white font-semibold">{d.headUser}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Allocated Fleet:</span>
                <span className="text-orange-400 font-mono font-bold">{d.assetCount} Assets</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Department Modal */}
      <Dialog open={isDeptOpen} onOpenChange={setIsDeptOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Department Unit</DialogTitle>
            <DialogDescription>
              Create a cost center or sub-department for asset custody scoping.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Department Name
              </label>
              <Input placeholder="e.g. Quality Assurance" className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Department Head (Manager User)
              </label>
              <Input placeholder="Select manager name" className="bg-black/40" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Description / Purpose
              </label>
              <Input placeholder="Short summary..." className="bg-black/40" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeptOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsDeptOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create Unit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
