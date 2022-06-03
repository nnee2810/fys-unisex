import { Box, Grid, HStack, Stack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "components/Button"
import Field from "components/Field"
import SelectBoxField from "components/Field/SelectBoxField"
import SelectField from "components/Field/SelectField"
import TextField from "components/Field/TextField"
import { formSchema } from "configs/formSchema"
import { ISelectOption } from "interfaces/ISelectOption"
import { UserGender } from "interfaces/IUser"
import useAuth from "modules/auth/hooks/useAuth"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils/getValidateMessage"
import {
  getDistrictOptions,
  getWardOptions,
  provinceOptions,
} from "utils/local"
import * as yup from "yup"
import useUser from "../../hooks/useUser"

const genderOptions: ISelectOption[] = [
  {
    label: "Nam",
    value: "MALE",
  },
  {
    label: "Nữ",
    value: "FEMALE",
  },
]

const schema = yup.object().shape({
  fullName: formSchema.fullName,
  phone: formSchema.phone,
  gender: yup
    .string()
    .label("Giới tính")
    .required(({ label }) => getValidateRequiredMessage(label))
    .test({
      test: (value) =>
        value ? Object.keys(UserGender).includes(value) : false,
      message: ({ label }) => getValidateInvalidMessage(label),
    }),
})

interface FormValues {
  fullName: string
  phone: string
  email: string
  address: string
  gender: UserGender
  province: string
  district: string
  ward: string
}

export default function FormUpdateProfile() {
  const { profile } = useAuth()
  const {
    updateUserProfile: { mutate, isLoading },
  } = useUser()
  const methods = useForm<FormValues>({
    defaultValues: {
      fullName: profile?.fullName,
      phone: profile?.phone,
      email: profile?.email,
      address: profile?.address,
      province: profile?.province,
      district: profile?.district,
      ward: profile?.ward,
      gender: profile?.gender,
    },
    resolver: yupResolver(schema),
  })
  const watchProvince = methods.watch("province")
  const watchDistrict = methods.watch("district")

  const handleSubmit = ({ phone, email, ...data }: FormValues) => {
    if (!profile) return
    mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field name="fullName" label="Họ tên" component={<TextField />} />
          <HStack alignItems="flex-end">
            <Box flex="1">
              <Field
                name="phone"
                label="Số điện thoại"
                component={<TextField isDisabled />}
              />
            </Box>
            <Button>Thay đổi</Button>
          </HStack>
          <HStack alignItems="flex-end">
            <Box flex="1">
              <Field
                name="email"
                label="Email"
                component={<TextField isDisabled />}
              />
            </Box>
            <Button>Thay đổi</Button>
          </HStack>
          <Field
            name="address"
            label="Địa chỉ"
            component={<TextField placeholder="Địa chỉ cụ thể ..." />}
          />
          <Grid templateColumns="1fr 1fr 1fr" gap="4">
            <Field
              name="province"
              label="Tỉnh/Thành phố"
              component={<SelectField options={provinceOptions} />}
            />
            <Field
              name="district"
              label="Quận/Huyện"
              component={
                <SelectField options={getDistrictOptions(watchProvince)} />
              }
            />
            <Field
              name="ward"
              label="Phường/Xã"
              component={
                <SelectField
                  options={getWardOptions(watchProvince, watchDistrict)}
                />
              }
            />
          </Grid>
          <Field
            name="gender"
            label="Giới tính"
            component={<SelectBoxField options={genderOptions} />}
          />
          <Button type="submit" isLoading={isLoading}>
            Cập nhật
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
