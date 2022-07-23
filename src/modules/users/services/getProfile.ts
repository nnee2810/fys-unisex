import { API } from "configs/services"
import { IResponse } from "interfaces"
import { IUserEntity } from "interfaces/entities"

export async function getProfile() {
  return (await API.get<IResponse<IUserEntity>>("/user/get-profile")).data.data
}
