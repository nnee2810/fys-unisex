import { UserGender } from "interfaces"

export interface UpdateUserProfileDto {
  id?: string
  name?: string
  gender?: UserGender
}
