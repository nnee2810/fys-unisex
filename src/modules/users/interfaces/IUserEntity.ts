import { IBaseEntity } from "interfaces"

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

export interface IUserEntity extends IBaseEntity {
  name: string
  gender: UserGender
  avatar?: {
    src?: string
  }
  phone: string
  role: UserRole
}
