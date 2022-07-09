import { Stack } from "@chakra-ui/react"
import { Field, FieldEnterAddress, TextField } from "components"
import { AiOutlineUser } from "react-icons/ai"

export function FormCreateProfile() {
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
      <FieldEnterAddress />
    </Stack>
  )
}
