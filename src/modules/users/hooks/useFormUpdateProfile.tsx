import { useAuth } from "modules/auth/hooks"
import {
  deleteWhiteSpace,
  validateInvalidMessage,
  validateRequiredMessage,
} from "utils"

import { yupResolver } from "@hookform/resolvers/yup"
import { formSchemas } from "helpers"
import { useAppDispatch } from "hooks"
import { UserGender } from "interfaces/entities"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_PROFILE } from "store/reducers/auth"
import * as yup from "yup"
import { updateProfile } from "../services"

interface FormValues {
  name: string
  phone: string
  gender: UserGender
}

const schema = yup.object({
  name: formSchemas.name,
  phone: formSchemas.phone,
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

  const { mutate, isLoading } = useMutation("update-profile", updateProfile, {
    onSuccess(data) {
      toast.success("Cập nhật tài khoản thành công")
      dispatch(SET_PROFILE(data))
    },
  })
  const methods = useForm<FormValues>({
    defaultValues: {
      name: profile?.name,
      phone: profile?.phone,
      gender: profile?.gender,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = ({ phone, ...data }: FormValues) => {
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
