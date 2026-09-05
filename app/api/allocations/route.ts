import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const allocations = await prisma.assetAllocation.findMany({
      include: {
        asset: true,
        employee: true,
        department: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: allocations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch allocations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assetId, targetType, employeeId, departmentId, expectedReturnDate } = body;

    const allocation = await prisma.assetAllocation.create({
      data: {
        assetId,
        targetType,
        employeeId,
        departmentId,
        expectedReturnDate: expectedReturnDate ? new Date(expectedReturnDate) : undefined,
      },
    });

    // Update asset status to ALLOCATED
    await prisma.asset.update({
      where: { id: assetId },
      data: { status: "ALLOCATED" },
    });

    return NextResponse.json({ success: true, data: allocation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create allocation" },
      { status: 500 }
    );
  }
}
