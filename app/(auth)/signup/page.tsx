"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, User, Mail, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    document.cookie = "better-auth.session_token=demo-token; path=/;";
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#08090d] flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-card p-8 border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-sm text-slate-400 mt-1">Register for StarterOps Workspace</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 block mb-1.5">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <User className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-white focus:outline-none w-full text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 block mb-1.5">
              Email Address
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <Mail className="w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white focus:outline-none w-full text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 block mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <Lock className="w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white focus:outline-none w-full text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-slate-400 block mb-1.5">
              Account Role Tier
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <Shield className="w-4 h-4 text-slate-500" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent text-white focus:outline-none w-full text-sm cursor-pointer"
              >
                <option value="USER">User / Employee</option>
                <option value="MANAGER">Department Manager</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 mt-2 gap-2"
          >
            <UserPlus className="w-4 h-4" /> Register & Access Dashboard
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
