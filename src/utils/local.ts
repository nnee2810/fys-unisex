import local from "configs/local.json"
import { ISelectOption } from "interfaces/ISelectOption"

interface Ward {
  id: string
  name: string
  prefix: string
}
interface District {
  id: string
  name: string
  wards: Ward[]
}
interface Province {
  id: string
  code: string
  name: string
  districts: District[]
}

export function getProvince(provinceId: string = ""): Province | undefined {
  if (!provinceId) return
  return local.find((province: Province) => province.id === provinceId)
}
export function getDistricts(provinceId: string = ""): District[] | undefined {
  if (!provinceId) return
  return getProvince(provinceId)?.districts
}
export function getDistrict(
  provinceId: string = "",
  districtId: string = ""
): District | undefined {
  if (!provinceId || !districtId) return

  return getDistricts(provinceId)?.find(
    (district: District) => district.id === districtId
  )
}
export function getWards(
  provinceId: string = "",
  districtId: string = ""
): Ward[] | undefined {
  if (!provinceId || !districtId) return
  return getDistrict(provinceId, districtId)?.wards
}
export function getWard(
  provinceId: string = "",
  districtId: string = "",
  wardId: string = ""
): Ward | undefined {
  if (!provinceId || !districtId || !wardId) return
  return getWards(provinceId, districtId)?.find(
    (ward: Ward) => ward.id === wardId
  )
}

export const provinceOptions: ISelectOption[] = local.map((province) => ({
  label: province.name,
  value: province.id,
}))
export function getDistrictOptions(provinceId: string = ""): ISelectOption[] {
  if (!provinceId) return []
  return (
    getDistricts(provinceId)?.map((district) => ({
      label: district.name,
      value: district.id,
    })) || []
  )
}
export function getWardOptions(
  provinceId?: string,
  districtId?: string
): ISelectOption[] {
  if (!provinceId || !districtId) return []
  return (
    getWards(provinceId, districtId)?.map((ward: Ward) => ({
      label: ward.prefix + " " + ward.name,
      value: ward.id,
    })) || []
  )
}
