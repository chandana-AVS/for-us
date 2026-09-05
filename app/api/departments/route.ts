import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      include: {
        headUser: true,
        _count: {
          select: { employees: true, assets: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, data: departments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, headUserId, parentDepartmentId } = body;

    const department = await prisma.department.create({
      data: {
        name,
        description,
        headUserId,
        parentDepartmentId,
      },
    });

    return NextResponse.json({ success: true, data: department }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create department" },
      { status: 500 }
    );
  }
}
