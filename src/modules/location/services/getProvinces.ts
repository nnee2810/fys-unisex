import { LocationAPI } from "configs/services"
import { IProvince } from "../interfaces"

export async function getProvinces() {
  return (await LocationAPI.get<IProvince[]>("/p")).data
}
