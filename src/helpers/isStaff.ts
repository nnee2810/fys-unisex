import { IUserEntity, StaffRole } from "modules/users/interfaces"

export function isStaff(user: IUserEntity | null) {
  if (!user) return false
  if (Object.keys(StaffRole).includes(user.role)) return true
  return false
}
