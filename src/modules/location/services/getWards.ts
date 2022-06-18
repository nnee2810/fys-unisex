import { LocationAPI } from "configs/services"
import { IDistrict } from "../interfaces"

export async function getWards(districtCode: number) {
  return (
    await LocationAPI.get<IDistrict>(`/d/${districtCode}`, {
      params: { depth: 2 },
    })
  ).data.wards
}
