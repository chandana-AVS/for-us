import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const auditCycles = await prisma.auditCycle.findMany({
      include: {
        scopeDepartment: true,
        auditItems: {
          include: { asset: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: auditCycles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch audit cycles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, scopeDepartmentId, startDate, endDate } = body;

    const cycle = await prisma.auditCycle.create({
      data: {
        name,
        scopeDepartmentId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json({ success: true, data: cycle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create audit cycle" },
      { status: 500 }
    );
  }
}
