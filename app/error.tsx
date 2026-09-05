"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Unexpected Application Error</h2>
      <p className="text-slate-400 text-sm max-w-md mb-6">{error.message || "An error occurred while processing your request."}</p>
      <Button onClick={() => reset()} className="bg-orange-500 hover:bg-orange-600">
        Try Again
      </Button>
    </div>
  );
}
