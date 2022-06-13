import { UserGender } from "interfaces"
import { useAuth } from "modules/auth/hooks"
import {
  deleteWhiteSpace,
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils"

import { yupResolver } from "@hookform/resolvers/yup"
import { Message } from "configs/constants"
import { formSchema } from "helpers"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import * as yup from "yup"
import { updateProfile } from "../services"

interface FormValues {
  name: string
  phone: string
  email: string
  gender: UserGender
}

const schema = yup.object().shape({
  name: formSchema.name,
  phone: formSchema.phone,
  gender: yup
    .string()
    .label("Giới tính")
    .required(({ label }) => getValidateRequiredMessage(label))
    .oneOf(Object.keys(UserGender), ({ label }) =>
      getValidateInvalidMessage(label)
    )
    .nullable(),
})

export function useFormUpdateProfile() {
  const { fetchProfile, profile } = useAuth()

  const { mutate, isLoading } = useMutation("updateProfile", updateProfile, {
    onSuccess() {
      toast.success("Cập nhật tài khoản thành công")
      fetchProfile()
    },
    onError() {
      toast.error(Message.SERVER_ERROR)
    },
  })
  const methods = useForm<FormValues>({
    defaultValues: {
      name: profile?.name,
      phone: profile?.phone,
      email: profile?.email,
      gender: profile?.gender,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = ({ phone, email, ...data }: FormValues) => {
    if (!profile) return
    mutate({
      ...data,
      name: deleteWhiteSpace(data.name),
    })
  }

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
