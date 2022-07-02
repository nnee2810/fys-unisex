export interface UpdateAddressDto {
  id: string
  name?: string
  phone?: string
  province_code?: number
  district_code?: number
  ward_code?: number
  address_detail?: string
  is_default?: boolean
}
