import { Box, HStack, Stack } from "@chakra-ui/react"
import { Field, NextButton, SelectBoxField, TextField } from "components"
import { ISelectOption } from "interfaces"
import { useFormUpdateProfile } from "modules/users/hooks"
import { FormProvider } from "react-hook-form"

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

export function FormUpdateProfile() {
  const { methods, handleSubmit, isLoading } = useFormUpdateProfile()

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
            <NextButton>Thay đổi</NextButton>
          </HStack>
          <HStack alignItems="flex-end">
            <Box flex="1">
              <Field
                name="email"
                label="Email"
                component={<TextField isDisabled />}
              />
            </Box>
            <NextButton>Thay đổi</NextButton>
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
          <NextButton type="submit" isLoading={isLoading}>
            Cập nhật
          </NextButton>
        </Stack>
      </form>
    </FormProvider>
  )
}
