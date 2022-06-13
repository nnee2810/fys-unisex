export interface IProvince {
  code: number
  name: string
  districts: IDistrict[]
}

export interface IDistrict {
  code: number
  province_code: number
  name: string
  wards: IWard[]
}

export interface IWard {
  code: number
  province_code: number
  name: string
}
