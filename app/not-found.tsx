import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-7xl font-extrabold text-orange-500 stat-mono">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4 mb-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm max-w-md mb-6">The page or resource you are searching for does not exist in StarterOps.</p>
      <Link href="/dashboard">
        <Button className="bg-orange-500 hover:bg-orange-600">Return to Dashboard</Button>
      </Link>
    </div>
  );
}
