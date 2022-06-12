import local from "configs/local.json"
import { ISelectOption } from "interfaces"
interface Province {
  name: string
  code: number
  districts: District[]
}
interface District {
  name: string
  code: number
  wards: Ward[]
}

interface Ward {
  name: string
  code: number
}

export function getProvince(provinceCode: number): Province | undefined {
  if (!provinceCode) return
  return local.find((province: Province) => province.code === provinceCode)
}
export function getDistricts(provinceCode: number): District[] | undefined {
  if (!provinceCode) return
  return getProvince(provinceCode)?.districts
}
export function getDistrict(
  provinceCode: number,
  districtCode: number
): District | undefined {
  if (!provinceCode || !districtCode) return

  return getDistricts(provinceCode)?.find(
    (district: District) => district.code === districtCode
  )
}
export function getWards(
  provinceCode: number,
  districtCode: number
): Ward[] | undefined {
  if (!provinceCode || !districtCode) return
  return getDistrict(provinceCode, districtCode)?.wards
}
export function getWard(
  provinceCode: number,
  districtCode: number,
  wardCode: number
): Ward | undefined {
  if (!provinceCode || !districtCode || !wardCode) return
  return getWards(provinceCode, districtCode)?.find(
    (ward: Ward) => ward.code === wardCode
  )
}

export const provinceOptions: ISelectOption[] = local.map((province) => ({
  label: province.name,
  value: province.code,
}))
export function getDistrictOptions(provinceCode: number): ISelectOption[] {
  if (!provinceCode) return []
  return (
    getDistricts(provinceCode)?.map((district) => ({
      label: district.name,
      value: district.code,
    })) || []
  )
}
export function getWardOptions(
  provinceCode?: number,
  districtCode?: number
): ISelectOption[] {
  if (!provinceCode || !districtCode) return []
  return (
    getWards(provinceCode, districtCode)?.map((ward: Ward) => ({
      label: ward.name,
      value: ward.code,
    })) || []
  )
}
