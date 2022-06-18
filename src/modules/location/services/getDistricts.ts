import { LocationAPI } from "configs/services"
import { IProvince } from "../interfaces"

export async function getDistricts(provinceCode: number) {
  return (
    await LocationAPI.get<IProvince>(`/p/${provinceCode}`, {
      params: {
        depth: 2,
      },
    })
  ).data.districts
}
