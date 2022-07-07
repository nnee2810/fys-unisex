import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  HStack,
  Stack,
  useBoolean,
} from "@chakra-ui/react"
import { Field, NextButton, TextField } from "components"
import { ActionOTP } from "modules/auth/dto"
import { FormResetPasswordValues, useSendOTP } from "modules/auth/hooks"
import moment from "moment"
import { useFormContext } from "react-hook-form"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineScan,
} from "react-icons/ai"
import { BsShieldLock } from "react-icons/bs"
import { useTimer } from "react-timer-hook"

export function FormResetPassword() {
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(59, "s").toDate(),
  })
  const { watch } = useFormContext<FormResetPasswordValues>()
  const { mutate, isLoading } = useSendOTP()
  const [passwordVisible, setPasswordVisible] = useBoolean()
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useBoolean()

  const watchPhone = watch("phone")

  const resendOTP = async () => {
    mutate(
      {
        phone: watchPhone,
        action: ActionOTP.RESET_PASSWORD,
      },
      {
        onSuccess() {
          restart(moment().add(59, "s").toDate())
        },
      }
    )
  }

  return (
    <Stack>
      <Alert status="success" variant="left-accent" borderRadius="6">
        <AlertIcon />
        <AlertDescription>
          Mã xác minh sẽ được gửi tới số điện thoại {watchPhone}
        </AlertDescription>
      </Alert>
      <HStack alignItems="flex-start">
        <Box flex="1">
          <Field
            name="otp"
            component={
              <TextField
                placeholder="Mã xác minh (6 chữ số)"
                maxLength={6}
                before={<AiOutlineScan fontSize="18" />}
              />
            }
          />
        </Box>
        <NextButton
          isLoading={isLoading}
          isDisabled={isRunning}
          onClick={resendOTP}
        >
          Gửi mã {isRunning && `(${seconds} giây)`}
        </NextButton>
      </HStack>
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
