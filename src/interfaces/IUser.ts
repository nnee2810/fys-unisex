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

export interface IUser {
  id: string
  fullName: string
  avatar?: string
  email: string
  phone: string

  role: UserRole
  createdAt: string
  updatedAt: string
}
