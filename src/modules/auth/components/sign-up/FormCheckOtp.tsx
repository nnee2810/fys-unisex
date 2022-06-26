import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react"
import { Field, NextButton, TextField } from "components"
import { FormSignUpValues } from "modules/auth/hooks"
import moment from "moment"
import { useFormContext } from "react-hook-form"
import { AiOutlineScan } from "react-icons/ai"
import { useTimer } from "react-timer-hook"

export function FormCheckOtp() {
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(59, "s").toDate(),
  })
  const { watch } = useFormContext<FormSignUpValues>()

  const watchPhone = watch("phone")

  const resendOtp = () => {
    restart(moment().add(59, "s").toDate())
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
        <NextButton isDisabled={isRunning} onClick={resendOtp}>
          Gửi mã {isRunning && `(${seconds} giây)`}
        </NextButton>
      </HStack>
      <NextButton type="submit">Xác minh</NextButton>
    </Stack>
  )
}
