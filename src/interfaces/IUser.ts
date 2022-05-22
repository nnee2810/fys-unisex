export interface IUser {
  id: string
  fullName: string
  image: string
  email: string
  phone: string
  address: string
  role: RoleType
  createdAt: string
  updatedAt: string
}
export type RoleType = "customer" | "mod" | "admin"
