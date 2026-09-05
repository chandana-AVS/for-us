import {
  PrismaClient,
  UserRole,
  AssetStatus,
  AssetCondition,
  AllocationTargetType,
  MaintenancePriority,
  MaintenanceStatus,
  BookingStatus,
  AuditCycleStatus,
  NotificationType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Comprehensive Database Seeding...");

  // 1. Seed Users
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@starterops.com" },
    update: {},
    create: {
      email: "admin@starterops.com",
      name: "System Admin",
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });

  const managerUser = await prisma.user.upsert({
    where: { email: "manager@starterops.com" },
    update: {},
    create: {
      email: "manager@starterops.com",
      name: "Alex Rivera",
      role: UserRole.MANAGER,
      emailVerified: true,
    },
  });

  const employeeUser = await prisma.user.upsert({
    where: { email: "user@starterops.com" },
    update: {},
    create: {
      email: "user@starterops.com",
      name: "Sarah Chen",
      role: UserRole.USER,
      emailVerified: true,
    },
  });

  console.log("✅ Seeded Users");

  // 2. Seed Departments
  const engDept = await prisma.department.upsert({
    where: { name: "Engineering" },
    update: {},
    create: {
      name: "Engineering",
      description: "Software engineering and R&D",
      headUserId: managerUser.id,
    },
  });

  const designDept = await prisma.department.upsert({
    where: { name: "Design" },
    update: {},
    create: {
      name: "Design",
      description: "UI/UX and product design",
    },
  });

  console.log("✅ Seeded Departments");

  // 3. Seed Employee Profiles
  const employeeProfile = await prisma.employee.upsert({
    where: { email: "user@starterops.com" },
    update: {},
    create: {
      userId: employeeUser.id,
      name: employeeUser.name,
      email: employeeUser.email,
      departmentId: engDept.id,
    },
  });

  console.log("✅ Seeded Employee Profile");

  // 4. Seed Asset Categories
  const hardwareCat = await prisma.assetCategory.upsert({
    where: { name: "IT Hardware" },
    update: {},
    create: {
      name: "IT Hardware",
      description: "Laptops, desktops, and workstations",
    },
  });

  const networkingCat = await prisma.assetCategory.upsert({
    where: { name: "Networking" },
    update: {},
    create: {
      name: "Networking",
      description: "Switches, routers, and access points",
    },
  });

  console.log("✅ Seeded Asset Categories");

  // 5. Seed Assets
  const asset1 = await prisma.asset.upsert({
    where: { assetTag: "AST-0001" },
    update: {},
    create: {
      assetTag: "AST-0001",
      name: 'MacBook Pro 16" M3 Max',
      categoryId: hardwareCat.id,
      serialNumber: "C02G408QMD6M",
      departmentId: engDept.id,
      status: AssetStatus.ALLOCATED,
      condition: AssetCondition.NEW,
      acquisitionCost: 3499.0,
      acquisitionDate: new Date("2026-01-15"),
    },
  });

  const asset2 = await prisma.asset.upsert({
    where: { assetTag: "AST-0003" },
    update: {},
    create: {
      assetTag: "AST-0003",
      name: "Cisco Catalyst 9300 Switch",
      categoryId: networkingCat.id,
      serialNumber: "FOC2419L0AB",
      departmentId: engDept.id,
      isBookable: true,
      status: AssetStatus.UNDER_MAINTENANCE,
      condition: AssetCondition.FAIR,
      acquisitionCost: 4200.0,
      acquisitionDate: new Date("2024-06-10"),
    },
  });

  console.log("✅ Seeded Assets");

  // 6. Seed Allocations
  await prisma.assetAllocation.create({
    data: {
      assetId: asset1.id,
      targetType: AllocationTargetType.EMPLOYEE,
      employeeId: employeeProfile.id,
      allocatedDate: new Date("2026-01-16"),
    },
  });

  console.log("✅ Seeded Allocations");

  // 7. Seed Resource Bookings
  await prisma.resourceBooking.create({
    data: {
      assetId: asset2.id,
      bookedByUserId: managerUser.id,
      startTime: new Date("2026-08-30T10:00:00Z"),
      endTime: new Date("2026-08-30T16:00:00Z"),
      status: BookingStatus.ONGOING,
      notes: "Network throughput test",
    },
  });

  console.log("✅ Seeded Resource Bookings");

  // 8. Seed Maintenance Request
  await prisma.maintenanceRequest.create({
    data: {
      assetId: asset2.id,
      raisedByUserId: employeeUser.id,
      issueDescription: "Fan noise and high operating temperature under load",
      priority: MaintenancePriority.HIGH,
      status: MaintenanceStatus.IN_PROGRESS,
    },
  });

  console.log("✅ Seeded Maintenance Requests");

  // 9. Seed Audit Cycle
  const auditCycle = await prisma.auditCycle.create({
    data: {
      name: "2026 Q3 Physical Asset Verification",
      scopeDepartmentId: engDept.id,
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-31"),
      status: AuditCycleStatus.IN_PROGRESS,
    },
  });

  await prisma.auditItem.create({
    data: {
      auditCycleId: auditCycle.id,
      assetId: asset1.id,
      verifiedByUserId: adminUser.id,
      verifiedAt: new Date(),
    },
  });

  console.log("✅ Seeded Audit Cycles & Items");

  // 10. Seed Notifications & Activity Logs
  await prisma.notification.create({
    data: {
      userId: employeeUser.id,
      type: NotificationType.ASSET_ASSIGNED,
      title: "New Asset Issued",
      message: 'MacBook Pro 16" M3 Max has been issued to your custody.',
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: adminUser.id,
      action: "Seeded initial system records",
      entity: "System",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("🚀 Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
