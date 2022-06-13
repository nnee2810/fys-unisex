import { LocationAPI } from "configs/service"
import { IProvince } from "interfaces"

export async function getProvinces() {
  return (await LocationAPI.get<IProvince[]>("/p")).data
}
