import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const maintenanceRequests = await prisma.maintenanceRequest.findMany({
      include: {
        asset: true,
        raisedByUser: true,
        assignedTechnician: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: maintenanceRequests });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch maintenance tickets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assetId, raisedByUserId, issueDescription, priority } = body;

    const ticket = await prisma.maintenanceRequest.create({
      data: {
        assetId,
        raisedByUserId,
        issueDescription,
        priority: priority || "MEDIUM",
      },
    });

    // Update asset status to UNDER_MAINTENANCE
    await prisma.asset.update({
      where: { id: assetId },
      data: { status: "UNDER_MAINTENANCE" },
    });

    return NextResponse.json({ success: true, data: ticket }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create maintenance ticket" },
      { status: 500 }
    );
  }
}
