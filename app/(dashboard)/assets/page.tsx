"use client";

import { useState } from "react";
import { Plus, Search, Filter, Download, Box, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatDate, formatCurrency } from "@/lib/utils";

const mockAssets = [
  {
    id: "1",
    assetTag: "AST-0001",
    name: "MacBook Pro 16\" M3 Max",
    category: "IT Hardware",
    serialNumber: "C02G408QMD6M",
    department: "Engineering",
    status: "ALLOCATED",
    condition: "NEW",
    cost: 3499.0,
    acquisitionDate: "2026-01-15",
  },
  {
    id: "2",
    assetTag: "AST-0002",
    name: "Dell UltraSharp 32\" 4K Monitor",
    category: "Peripherals",
    serialNumber: "CN-0V8392-74261",
    department: "Design",
    status: "AVAILABLE",
    condition: "GOOD",
    cost: 899.5,
    acquisitionDate: "2025-11-20",
  },
  {
    id: "3",
    assetTag: "AST-0003",
    name: "Cisco Catalyst 9300 Switch",
    category: "Networking",
    serialNumber: "FOC2419L0AB",
    department: "Infrastructure",
    status: "UNDER_MAINTENANCE",
    condition: "FAIR",
    cost: 4200.0,
    acquisitionDate: "2024-06-10",
  },
  {
    id: "4",
    assetTag: "AST-0004",
    name: "Ergonomic Mesh Task Chair",
    category: "Furniture",
    serialNumber: "HM-AERON-9982",
    department: "Human Resources",
    status: "ALLOCATED",
    condition: "GOOD",
    cost: 1250.0,
    acquisitionDate: "2025-03-01",
  },
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="success">Available</Badge>;
      case "ALLOCATED":
        return <Badge variant="secondary">Allocated</Badge>;
      case "UNDER_MAINTENANCE":
        return <Badge variant="warning">Under Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Box className="w-8 h-8 text-orange-500" /> Asset Directory
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage lifecycle, physical location, and allocation records for enterprise resources
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Register Asset
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by tag, name, serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="ALLOCATED">Allocated</option>
            <option value="UNDER_MAINTENANCE">Under Maintenance</option>
          </select>
        </div>
      </div>

      {/* Dense Data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Tag</TableHead>
            <TableHead>Name & Category</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Acquired</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-bold text-orange-400 stat-mono">
                {asset.assetTag}
              </TableCell>
              <TableCell>
                <div className="font-semibold text-white">{asset.name}</div>
                <div className="text-xs text-slate-400">{asset.category}</div>
              </TableCell>
              <TableCell className="stat-mono text-xs text-slate-300">
                {asset.serialNumber}
              </TableCell>
              <TableCell className="text-slate-300">{asset.department}</TableCell>
              <TableCell>{getStatusBadge(asset.status)}</TableCell>
              <TableCell className="stat-mono font-medium text-slate-200">
                {formatCurrency(asset.cost)}
              </TableCell>
              <TableCell className="text-xs text-slate-400">
                {formatDate(asset.acquisitionDate)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
