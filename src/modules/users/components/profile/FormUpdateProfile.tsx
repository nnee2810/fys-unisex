import { Box, HStack, Stack, useBoolean } from "@chakra-ui/react"
import { Field, NextButton, SelectBoxField, TextField } from "components"
import { ISelectOption } from "interfaces"
import { useFormUpdateProfile } from "modules/users/hooks"
import { FormProvider } from "react-hook-form"
import { ModalUpdatePhone } from "."

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
  const [openUpdatePhone, setOpenUpdatePhone] = useBoolean()

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Stack>
            <Field name="name" label="Họ tên" component={<TextField />} />
            <HStack alignItems="flex-end">
              <Box flex="1">
                <Field
                  name="phone"
                  label="Số điện thoại"
                  component={<TextField isDisabled />}
                />
              </Box>
              <NextButton onClick={setOpenUpdatePhone.on}>Thay đổi</NextButton>
            </HStack>
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
      <ModalUpdatePhone
        isOpen={openUpdatePhone}
        onClose={setOpenUpdatePhone.off}
      />
    </Box>
  )
}
