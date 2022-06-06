import { UserGender } from "interfaces/IUser"

export interface UpdateUserProfileDto {
  id?: string
  fullName?: string
  gender?: UserGender
}
