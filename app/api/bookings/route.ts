import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.resourceBooking.findMany({
      include: {
        asset: true,
        bookedByUser: true,
        bookedForDepartment: true,
      },
      orderBy: { startTime: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assetId, bookedByUserId, startTime, endTime, notes } = body;

    const booking = await prisma.resourceBooking.create({
      data: {
        assetId,
        bookedByUserId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        notes,
      },
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
