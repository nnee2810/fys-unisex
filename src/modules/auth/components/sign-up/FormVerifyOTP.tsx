import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react"
import { Field, NextButton, TextField } from "components"
import { ActionOTP } from "modules/auth/dto"
import { FormSignUpValues, useSendOTP } from "modules/auth/hooks"
import moment from "moment"
import { useFormContext } from "react-hook-form"
import { AiOutlineScan } from "react-icons/ai"
import { useTimer } from "react-timer-hook"

export function FormVerifyOTP() {
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(59, "s").toDate(),
  })
  const { watch } = useFormContext<FormSignUpValues>()
  const { mutate, isLoading } = useSendOTP()

  const watchPhone = watch("phone")

  const resendOTP = async () => {
    mutate(
      {
        phone: watchPhone,
        action: ActionOTP.SIGN_UP,
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
    </Stack>
  )
}
