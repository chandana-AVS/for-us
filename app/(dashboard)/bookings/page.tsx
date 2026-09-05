"use client";

import { useState } from "react";
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  Search,
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

interface Booking {
  id: string;
  assetTag: string;
  assetName: string;
  bookedBy: string;
  department: string;
  startTime: string;
  endTime: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
}

const mockBookings: Booking[] = [
  {
    id: "book-1",
    assetTag: "AST-0003",
    assetName: "Cisco Catalyst Switch Lab Bench #2",
    bookedBy: "Alex Rivera",
    department: "Engineering",
    startTime: "2026-08-30 10:00 AM",
    endTime: "2026-08-30 04:00 PM",
    status: "ONGOING",
  },
  {
    id: "book-2",
    assetTag: "AST-0008",
    assetName: "4K Cinema Projection Rig #1",
    bookedBy: "Elena Rostova",
    department: "Design",
    startTime: "2026-09-02 09:00 AM",
    endTime: "2026-09-02 01:00 PM",
    status: "UPCOMING",
  },
  {
    id: "book-3",
    assetTag: "AST-0012",
    assetName: "High-Performance GPU Cluster Node #4",
    bookedBy: "Sarah Chen",
    department: "R&D AI Lab",
    startTime: "2026-08-28 12:00 PM",
    endTime: "2026-08-29 12:00 PM",
    status: "COMPLETED",
  },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookOpen, setIsBookOpen] = useState(false);

  const filteredBookings = mockBookings.filter(
    (item) =>
      item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-card p-6 border-purple-500/20 bg-gradient-to-r from-purple-500/10 via-transparent to-orange-500/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              TIME-SLOT RESERVATION ENGINE
            </Badge>
            <span className="text-xs text-slate-400">• Conflict-Free Resource Scheduler</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-purple-500" /> Resource Bookings & Schedules
          </h1>
        </div>

        <Button
          onClick={() => setIsBookOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4" /> Reserve Resource Slot
        </Button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>ONGOING SLOTS</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 stat-mono">8 Active</div>
          <p className="text-xs text-slate-500 mt-1">Currently in use</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>UPCOMING RESERVATIONS</span>
            <CalendarIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">34</div>
          <p className="text-xs text-slate-500 mt-1">Scheduled for next 7 days</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>UTILIZATION RATE</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white stat-mono">89.4%</div>
          <p className="text-xs text-slate-500 mt-1">High resource efficiency</p>
        </div>
      </div>

      {/* Search & Schedule Controls */}
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <Input
            placeholder="Search by resource, asset tag, user..."
            className="pl-9 bg-black/30 border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white text-base">Resource Reservation Ledger</h3>
          <span className="text-xs text-slate-400">{filteredBookings.length} Slot(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3.5">Asset Tag & Resource</th>
                <th className="px-6 py-3.5">Booked By</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Start Time</th>
                <th className="px-6 py-3.5">End Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-orange-400 font-mono font-semibold text-xs block">
                      {item.assetTag}
                    </span>
                    <span className="text-white font-medium block">{item.assetName}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{item.bookedBy}</td>
                  <td className="px-6 py-4 text-slate-400">{item.department}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{item.startTime}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{item.endTime}</td>
                  <td className="px-6 py-4">
                    {item.status === "ONGOING" && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 animate-pulse">
                        IN USE NOW
                      </Badge>
                    )}
                    {item.status === "UPCOMING" && (
                      <Badge className="bg-purple-500/15 text-purple-400 border-purple-500/30">
                        UPCOMING
                      </Badge>
                    )}
                    {item.status === "COMPLETED" && (
                      <Badge className="bg-slate-500/15 text-slate-400 border-slate-500/30">
                        FINISHED
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                      Cancel Slot
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      <Dialog open={isBookOpen} onOpenChange={setIsBookOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reserve Resource Time Slot</DialogTitle>
            <DialogDescription>
              Book equipment or facility time with automatic collision prevention.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Bookable Asset / Facility
              </label>
              <Input placeholder="Select AST-xxxx..." className="bg-black/40" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Start DateTime
                </label>
                <Input type="datetime-local" className="bg-black/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  End DateTime
                </label>
                <Input type="datetime-local" className="bg-black/40" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Booking Purpose / Notes
              </label>
              <Input placeholder="Project requirement notes..." className="bg-black/40" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsBookOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsBookOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
