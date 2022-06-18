import { UserRole } from "modules/users/interfaces"

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
