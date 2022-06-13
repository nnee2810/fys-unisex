import { API } from "configs/service"
import { IResponse, IUser } from "interfaces"

export async function getProfile() {
  return (await API.get<IResponse<IUser>>("/users/profile")).data.data
}
