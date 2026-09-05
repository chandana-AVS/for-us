"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, Database, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-orange-500" /> System & User Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure profile details, security parameters, system notifications, and database connection.
        </p>
      </div>

      {/* User Profile Settings */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <User className="w-5 h-5 text-orange-400" />
          <h3 className="font-bold text-white text-lg">Administrator Profile</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
            <Input defaultValue="System Administrator" className="bg-black/30" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Email Address
            </label>
            <Input defaultValue="admin@starterops.com" className="bg-black/30" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Job Title</label>
            <Input defaultValue="VP of Infrastructure Operations" className="bg-black/30" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Assigned Role Tier
            </label>
            <Input defaultValue="ADMIN (Full System Controls)" disabled className="bg-black/50 text-orange-400 font-semibold" />
          </div>
        </div>
      </div>

      {/* Security & RBAC Configuration */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-lg">Security & Authentication Guards</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
            <div>
              <span className="text-white font-medium text-sm block">
                Two-Factor Authentication (2FA)
              </span>
              <span className="text-xs text-slate-400 block">
                Require TOTP authentication code on admin login
              </span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded" />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
            <div>
              <span className="text-white font-medium text-sm block">
                Automated Session Revocation
              </span>
              <span className="text-xs text-slate-400 block">
                Revoke inactive JWT tokens after 30 minutes of idle state
              </span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded" />
          </div>
        </div>
      </div>

      {/* Notifications & System Integrations */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-white text-lg">Email & Webhook Dispatcher</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
            <div>
              <span className="text-white font-medium text-sm block">
                Overdue Return Alerts
              </span>
              <span className="text-xs text-slate-400 block">
                Send automated email notices to custodians when allocation expires
              </span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded" />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
            <div>
              <span className="text-white font-medium text-sm block">
                Maintenance Ticket Escalations
              </span>
              <span className="text-xs text-slate-400 block">
                Notify department head when CRITICAL repair ticket is unassigned for &gt; 4 hrs
              </span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-orange-500 rounded" />
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-lg shadow-orange-500/20 px-8"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-white" /> Settings Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save System Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
