import API from "configs/service"
import { IUser } from "interfaces/IUser"

export async function getProfile(): Promise<IUser> {
  return (await API.get("/users/profile")).data
}
