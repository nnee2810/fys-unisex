import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  HStack,
} from "@chakra-ui/react"
import { ActionOTP } from "modules/auth/dto"
import { useSendOTP } from "modules/auth/hooks"
import moment from "moment"
import { useFormContext } from "react-hook-form"
import { AiOutlineScan } from "react-icons/ai"
import { useTimer } from "react-timer-hook"
import { Field, TextField } from "./Field"
import { NextButton } from "./NextButton"

interface FieldEnterOTPProps {
  field_phone: string
  action: ActionOTP
}

export function FieldEnterOTP({ field_phone, action }: FieldEnterOTPProps) {
  const { seconds, isRunning, restart } = useTimer({
    expiryTimestamp: moment().add(59, "s").toDate(),
  })
  const { watch } = useFormContext()
  const { mutate, isLoading } = useSendOTP()
  const watchPhone = watch(field_phone)

  const resendOTP = async () => {
    mutate(
      {
        phone: watchPhone,
        action,
      },
      {
        onSuccess() {
          restart(moment().add(59, "s").toDate())
        },
      }
    )
  }

  return (
    <>
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
    </>
  )
}
