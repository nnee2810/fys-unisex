import { IBaseEntity } from "interfaces"

export interface IAddressEntity extends IBaseEntity {
  name: string
  phone: string
  address: string
  province_code: number
  district_code: number
  ward_code: number
  address_detail: string
  is_default: boolean
}
