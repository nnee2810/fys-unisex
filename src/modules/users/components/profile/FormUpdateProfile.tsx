import { Box, HStack, Stack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Field, SelectBoxField, TextField } from "components"
import { formSchema } from "helpers"
import { ISelectOption, UserGender } from "interfaces"
import { useAuth } from "modules/auth/hooks"
import { useUpdateUserProfile } from "modules/users/hooks"
import { FormProvider, useForm } from "react-hook-form"
import {
  deleteWhiteSpace,
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils"
import * as yup from "yup"

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
  name: formSchema.name,
  phone: formSchema.phone,
  gender: yup
    .string()
    .label("Giới tính")
    .required(({ label }) => getValidateRequiredMessage(label))
    .oneOf(Object.keys(UserGender), ({ label }) =>
      getValidateInvalidMessage(label)
    )
    .nullable(),
})

interface FormValues {
  name: string
  phone: string
  email: string
  gender: UserGender
}

export function FormUpdateProfile() {
  const { profile } = useAuth()
  const { mutate, isLoading } = useUpdateUserProfile()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: profile?.name,
      phone: profile?.phone,
      email: profile?.email,
      gender: profile?.gender,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = ({ phone, email, ...data }: FormValues) => {
    if (!profile) return
    mutate({
      ...data,
      name: deleteWhiteSpace(data.name),
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack spacing="4">
          <Field name="name" label="Họ tên" component={<TextField />} />
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
          {/* <Field
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
          </Grid> */}
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
