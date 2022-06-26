import { Stack } from "@chakra-ui/react"
import { Field, NextButton, TextField } from "components"
import { IoPhonePortraitOutline } from "react-icons/io5"

export function FormEnterPhone() {
  return (
    <Stack>
      <Field
        name="phone"
        component={
          <TextField
            placeholder="Số điện thoại"
            before={<IoPhonePortraitOutline fontSize="18" />}
          />
        }
      />
      <NextButton type="submit">Gửi mã</NextButton>
    </Stack>
  )
}
