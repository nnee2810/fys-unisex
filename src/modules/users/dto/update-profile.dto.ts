import { UserGender } from "../interfaces"

export interface UpdateProfileDto {
  name?: string
  gender?: UserGender
}
