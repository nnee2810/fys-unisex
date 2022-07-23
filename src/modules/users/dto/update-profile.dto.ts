import { UserGender } from "interfaces/entities"

export interface UpdateProfileDto {
  name?: string
  gender?: UserGender
}
