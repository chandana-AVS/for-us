"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#08090d]/80 backdrop-blur-md sticky top-0 z-30">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3.5 py-1.5 w-80">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search assets, requests, tickets..."
          className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
        />
        <kbd className="hidden sm:inline-block text-[10px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded border border-white/10">
          ⌘K
        </kbd>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            A
          </div>
          <div className="hidden md:block text-left">
            <span className="text-sm font-semibold text-white block leading-tight">
              Admin User
            </span>
            <span className="text-[11px] text-orange-400 font-medium block">
              SYSTEM ADMIN
            </span>
          </div>

          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
