import { useAuth } from "modules/auth/hooks"
import {
  deleteWhiteSpace,
  validateInvalidMessage,
  validateRequiredMessage,
} from "utils"

import { yupResolver } from "@hookform/resolvers/yup"
import { formSchema } from "helpers"
import { useAppDispatch } from "hooks"
import { UserGender } from "interfaces/entities"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useUpdateProfile } from "."

interface FormValues {
  name: string
  phone: string
  gender: UserGender
}

const schema = yup.object({
  name: formSchema.name,
  phone: formSchema.phone,
  gender: yup
    .string()
    .label("Giới tính")
    .required(validateRequiredMessage)
    .oneOf(Object.keys(UserGender), validateInvalidMessage)
    .nullable(),
})

export function useFormUpdateProfile() {
  const dispatch = useAppDispatch()
  const { profile } = useAuth()

  const { mutate, isLoading } = useUpdateProfile()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      gender: profile.gender,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = ({ phone, ...data }: FormValues) => {
    if (!profile) return
    mutate(
      {
        ...data,
        name: deleteWhiteSpace(data.name),
      },
      {
        onSuccess() {
          toast.success("Cập nhật tài khoản thành công")
        },
      }
    )
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
