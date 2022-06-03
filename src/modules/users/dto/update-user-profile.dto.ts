import { Gender } from "interfaces/IUser"

export interface UpdateUserProfileDto {
  id?: string
  fullName?: string
  address?: string
  province?: string
  district?: string
  ward?: string
  gender?: Gender
}
