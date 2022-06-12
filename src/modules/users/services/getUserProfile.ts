import API from "configs/service"
import { IUser } from "interfaces"

export async function getUserProfile() {
  return (await API.get<IUser>("/users/profile")).data
}
