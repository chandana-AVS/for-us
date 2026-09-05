import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role") || "ADMIN";

  // Role-Scoped Data Payload (Asset-Ops + Playdoo Pattern)
  const dashboardData = {
    role,
    metrics: {
      totalAssets: role === "USER" ? 4 : 1428,
      allocatedAssets: role === "USER" ? 2 : 1180,
      maintenanceTickets: role === "USER" ? 1 : 14,
      totalValuation: role === "USER" ? "$4,200" : "$2.4M",
    },
    systemHealth: {
      dbLatencyMs: 14,
      cacheHitRate: "98.2%",
      activeTraces: 4120,
    },
  };

  return NextResponse.json(dashboardData);
}
