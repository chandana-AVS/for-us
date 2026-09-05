import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "StarterOps API Engine",
    version: "1.0.0",
    uptime: process.uptime(),
  });
}
