import { yupResolver } from "@hookform/resolvers/yup"
import { isPhoneNumber } from "class-validator"
import { SuccessMessage } from "configs/constants"
import { ActionOTP } from "modules/auth/dto"
import { useSendOTP } from "modules/auth/hooks"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getValidateInvalidMessage, getValidateRequiredMessage } from "utils"
import * as yup from "yup"
import { useUpdatePhone } from "."

export interface FormUpdatePhoneValues {
  step: number
  new_phone: string
  otp: string
}

const schema = yup.object({
  step: yup.number(),
  new_phone: yup
    .string()
    .label("Số điện thoại mới")
    .when("step", {
      is: 1,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .max(10, getValidateInvalidMessage)
        .test({
          test: (value) => (value ? isPhoneNumber(value, "VN") : false),
          message: getValidateInvalidMessage,
        }),
    }),
  otp: yup
    .string()
    .label("Mã xác minh")
    .when("step", {
      is: 2,
      then: yup
        .string()
        .required(getValidateRequiredMessage)
        .length(6, getValidateInvalidMessage),
    }),
})

export function useFormUpdatePhone(onClose: () => void) {
  const methods = useForm<FormUpdatePhoneValues>({
    defaultValues: {
      step: 1,
      new_phone: "",
      otp: "",
    },
    resolver: yupResolver(schema),
  })
  const { mutate: mutateSendOTP, isLoading: isLoadingSendOTP } = useSendOTP()
  const { mutate: mutateUpdatePhone, isLoading: isLoadingUpdatePhone } =
    useUpdatePhone()

  const watchStep = methods.watch("step")
  const nextStep = () => {
    methods.setValue("step", watchStep + 1)
  }
  const handleSubmit = async ({
    step,
    new_phone,
    otp,
  }: FormUpdatePhoneValues) => {
    switch (step) {
      case 1: {
        mutateSendOTP(
          {
            phone: new_phone,
            action: ActionOTP.UPDATE_PHONE,
          },
          {
            onSuccess(data) {
              //@ts-ignore
              window.session_info = data
              nextStep()
            },
          }
        )
        break
      }
      case 2: {
        mutateUpdatePhone(
          {
            otp,
            new_phone,
          },
          {
            onSuccess() {
              onClose()
              toast.success(SuccessMessage.UPDATE_PHONE_SUCCESS)
            },
          }
        )
        break
      }
    }
  }

  return {
    methods,
    handleSubmit,
    isLoading: isLoadingSendOTP || isLoadingUpdatePhone,
  }
}
