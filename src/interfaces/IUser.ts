export interface IUser {
  id: string
  fullName: string
  gender?: UserGender
  avatar?: string
  email: string
  phone: string
  address?: string
  province?: string
  district?: string
  ward?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}
export enum UserRole {
  GUEST = "GUEST",
  CUSTOMER = "CUSTOMER",
  MOD = "MOD",
  ADMIN = "ADMIN",
}
export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
