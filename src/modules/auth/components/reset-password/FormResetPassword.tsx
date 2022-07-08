import { Box, Stack, useBoolean } from "@chakra-ui/react"
import { Field, TextField } from "components"
import { FieldEnterOTP } from "components/FieldEnterOTP"
import { ActionOTP } from "modules/auth/dto"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsShieldLock } from "react-icons/bs"

export function FormResetPassword() {
  const [passwordVisible, setPasswordVisible] = useBoolean()
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useBoolean()

  return (
    <Stack>
      <FieldEnterOTP field_phone="phone" action={ActionOTP.RESET_PASSWORD} />
      <Field
        name="password"
        component={
          <TextField
            type={passwordVisible ? "text" : "password"}
            placeholder="Mật khẩu"
            before={<BsShieldLock fontSize="18" />}
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
            before={<BsShieldLock fontSize="18" />}
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
    </Stack>
  )
}
