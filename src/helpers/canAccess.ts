import { Role } from "interfaces/IUser"

interface CanAccessArgs {
  userRole?: Role
  pageRoles: Role[]
}

export function canAccess({ userRole = Role.Guest, pageRoles }: CanAccessArgs) {
  if (pageRoles.includes(userRole)) return true
  return false
}
