import { IUser } from "./IUser"

export interface IReview {
  id: string
  user: IUser
  content: string
  rate: number
  createdAt: string
}
