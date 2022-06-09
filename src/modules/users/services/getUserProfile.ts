import API from "configs/service"
import { IUser } from "interfaces/IUser"

export async function getUserProfile() {
  return (await API.get<IUser>("/users/profile")).data
}
