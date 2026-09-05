import { z } from "zod";

export const assetSchema = z.object({
  assetTag: z.string().min(3, "Asset tag must be at least 3 characters"),
  name: z.string().min(2, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  departmentId: z.string().optional(),
  acquisitionCost: z.number().optional(),
  serialNumber: z.string().optional(),
});

export const allocationSchema = z.object({
  assetId: z.string().min(1, "Asset is required"),
  targetType: z.enum(["EMPLOYEE", "DEPARTMENT"]),
  employeeId: z.string().optional(),
  departmentId: z.string().optional(),
  expectedReturnDate: z.string().optional(),
});

export const bookingSchema = z.object({
  assetId: z.string().min(1, "Asset is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  notes: z.string().optional(),
});

export const maintenanceSchema = z.object({
  assetId: z.string().min(1, "Asset is required"),
  issueDescription: z.string().min(5, "Description must be at least 5 characters"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
});

export const auditCycleSchema = z.object({
  name: z.string().min(3, "Cycle name is required"),
  scopeDepartmentId: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});
