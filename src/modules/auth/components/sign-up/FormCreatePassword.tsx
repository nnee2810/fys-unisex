import { Box, Stack, useBoolean } from "@chakra-ui/react"
import { Field, NextButton, TextField } from "components"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from "react-icons/ai"

export function FormCreatePassword() {
  const [passwordVisible, setPasswordVisible] = useBoolean()
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useBoolean()

  return (
    <Stack>
      <Field
        name="password"
        component={
          <TextField
            type={passwordVisible ? "text" : "password"}
            placeholder="Mật khẩu"
            before={<AiOutlineLock fontSize="18" />}
            after={
              <Box
                fontSize="18"
                cursor="pointer"
                onClick={setPasswordVisible.toggle}
              >
                {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </Box>
            }
          />
        }
      />
      <Field
        name="repeat_password"
        component={
          <TextField
            type={repeatPasswordVisible ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            before={<AiOutlineLock fontSize="18" />}
            after={
              <Box
                fontSize="18"
                cursor="pointer"
                onClick={setRepeatPasswordVisible.toggle}
              >
                {repeatPasswordVisible ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </Box>
            }
          />
        }
      />
      <NextButton type="submit">Tiếp theo</NextButton>
    </Stack>
  )
}
