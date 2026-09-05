import { UserRole } from "@prisma/client";

export const PERMISSIONS = {
  // Asset Management
  ASSET_CREATE: "asset:create",
  ASSET_READ: "asset:read",
  ASSET_UPDATE: "asset:update",
  ASSET_DELETE: "asset:delete",

  // Allocation Management
  ALLOCATION_CREATE: "allocation:create",
  ALLOCATION_RETURN: "allocation:return",
  ALLOCATION_VIEW_ALL: "allocation:view_all",

  // Transfer Workflows
  TRANSFER_REQUEST: "transfer:request",
  TRANSFER_APPROVE: "transfer:approve",

  // Bookings
  BOOKING_CREATE: "booking:create",
  BOOKING_CANCEL: "booking:cancel",
  BOOKING_VIEW_ALL: "booking:view_all",

  // Maintenance
  MAINTENANCE_RAISE: "maintenance:raise",
  MAINTENANCE_APPROVE: "maintenance:approve",
  MAINTENANCE_ASSIGN: "maintenance:assign",
  MAINTENANCE_RESOLVE: "maintenance:resolve",

  // Audits
  AUDIT_CREATE_CYCLE: "audit:create_cycle",
  AUDIT_VERIFY: "audit:verify",
  AUDIT_CLOSE: "audit:close",

  // Organization Setup
  ORG_SETUP_MANAGE: "org:manage",

  // Analytics & Reports
  ANALYTICS_VIEW_OWN: "analytics:view_own",
  ANALYTICS_VIEW_ORG: "analytics:view_org",
} as const;

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  USER: [
    PERMISSIONS.ASSET_READ,
    PERMISSIONS.TRANSFER_REQUEST,
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_CANCEL,
    PERMISSIONS.MAINTENANCE_RAISE,
    PERMISSIONS.ANALYTICS_VIEW_OWN,
  ],
  MANAGER: [
    PERMISSIONS.ASSET_READ,
    PERMISSIONS.ASSET_CREATE,
    PERMISSIONS.ASSET_UPDATE,
    PERMISSIONS.ALLOCATION_CREATE,
    PERMISSIONS.ALLOCATION_RETURN,
    PERMISSIONS.TRANSFER_REQUEST,
    PERMISSIONS.TRANSFER_APPROVE,
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.BOOKING_CANCEL,
    PERMISSIONS.BOOKING_VIEW_ALL,
    PERMISSIONS.MAINTENANCE_RAISE,
    PERMISSIONS.MAINTENANCE_APPROVE,
    PERMISSIONS.MAINTENANCE_RESOLVE,
    PERMISSIONS.AUDIT_VERIFY,
    PERMISSIONS.ANALYTICS_VIEW_OWN,
    PERMISSIONS.ANALYTICS_VIEW_ORG,
  ],
  ADMIN: Object.values(PERMISSIONS),
};

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  const userPerms = ROLE_PERMISSIONS[userRole] || [];
  return userPerms.includes(permission);
};

export const roleHierarchy: Record<UserRole, number> = {
  USER: 1,
  MANAGER: 2,
  ADMIN: 3,
};

export const hasRoleOrHigher = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
