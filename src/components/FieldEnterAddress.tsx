import { Grid, useBoolean } from "@chakra-ui/react"
import { ISelectOption } from "interfaces"
import { getDistricts, getProvinces, getWards } from "modules/location/services"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { AiOutlineHome } from "react-icons/ai"
import { Field, SelectField, TextField } from "./Field"

export function FieldEnterAddress() {
  const { watch, setValue } = useFormContext()
  const [provinceOptions, setProvinceOptions] = useState<
    ISelectOption<number>[]
  >([])
  const [districtOptions, setDistrictOptions] = useState<
    ISelectOption<number>[]
  >([])
  const [wardOptions, setWardOptions] = useState<ISelectOption<number>[]>([])
  const [isMount, setIsMount] = useBoolean()

  const watchProvinceCode = watch("province_code")
  const watchDistrictCode = watch("district_code")

  useEffect(() => {
    getProvinces().then((provinces) =>
      setProvinceOptions(
        provinces.map((province) => ({
          label: province.name,
          value: province.code,
        }))
      )
    )
    setIsMount.on()
  }, [setIsMount])

  useEffect(() => {
    if (isMount) {
      setValue("district_code", undefined)
      setDistrictOptions([])
    }
    if (watchProvinceCode)
      getDistricts(watchProvinceCode).then((districts) =>
        setDistrictOptions(
          districts.map((district) => ({
            label: district.name,
            value: district.code,
          }))
        )
      )
  }, [watchProvinceCode, isMount, setValue])

  useEffect(() => {
    if (isMount) {
      setValue("ward_code", undefined)
      setWardOptions([])
    }
    if (watchDistrictCode)
      getWards(watchDistrictCode).then((wards) =>
        setWardOptions(
          wards.map((ward) => ({
            label: ward.name,
            value: ward.code,
          }))
        )
      )
  }, [watchDistrictCode, isMount, setValue])

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap="2">
        <Field
          name="province_code"
          component={
            <SelectField
              options={provinceOptions}
              placeholder="Tỉnh/Thành phố"
            />
          }
        />
        <Field
          name="district_code"
          component={
            <SelectField options={districtOptions} placeholder="Quận/Huyện" />
          }
        />
        <Field
          name="ward_code"
          component={
            <SelectField options={wardOptions} placeholder="Phường/Xã" />
          }
        />
      </Grid>
      <Field
        name="address_detail"
        component={
          <TextField
            placeholder="Địa chỉ cụ thể (nếu có)"
            before={<AiOutlineHome fontSize="18" />}
          />
        }
      />
    </>
  )
}
