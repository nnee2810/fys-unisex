import { Grid, Stack } from "@chakra-ui/react"
import { Field, SelectField, TextField } from "components"
import { ISelectOption } from "interfaces"
import { FormSignUpValues } from "modules/auth/hooks"
import { getDistricts, getProvinces, getWards } from "modules/location/services"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"

export function FormCreateProfile() {
  const { watch, setValue } = useFormContext<FormSignUpValues>()
  const [provinceOptions, setProvinceOptions] = useState<ISelectOption[]>([])
  const [districtOptions, setDistrictOptions] = useState<ISelectOption[]>([])
  const [wardOptions, setWardOptions] = useState<ISelectOption[]>([])

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
  }, [])

  useEffect(() => {
    setValue("district_code", undefined)
    setDistrictOptions([])
    if (watchProvinceCode)
      getDistricts(watchProvinceCode).then((districts) =>
        setDistrictOptions(
          districts.map((district) => ({
            label: district.name,
            value: district.code,
          }))
        )
      )
  }, [watchProvinceCode])

  useEffect(() => {
    setValue("ward_code", undefined)
    setWardOptions([])
    if (watchDistrictCode)
      getWards(watchDistrictCode).then((wards) =>
        setWardOptions(
          wards.map((ward) => ({
            label: ward.name,
            value: ward.code,
          }))
        )
      )
  }, [watchDistrictCode])

  return (
    <Stack>
      <Field
        name="name"
        component={
          <TextField
            placeholder="Họ và tên"
            before={<AiOutlineUser fontSize="18" />}
          />
        }
      />

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
    </Stack>
  )
}
