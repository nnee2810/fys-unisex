import { UserRole } from "interfaces/entities"

interface CanAccessParams {
  userRole?: UserRole
  pageRoles: UserRole[]
}

export function canAccess({
  userRole = UserRole.GUEST,
  pageRoles,
}: CanAccessParams) {
  if (pageRoles.includes(userRole)) return true
  return false
}
