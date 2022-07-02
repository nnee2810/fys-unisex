import { useAuth } from "modules/auth/hooks"
import {
  deleteWhiteSpace,
  getValidateInvalidMessage,
  getValidateRequiredMessage,
} from "utils"

import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage, SuccessMessage } from "configs/constants"
import { formSchemas } from "helpers"
import { useAppDispatch } from "hooks"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_PROFILE } from "store/reducers/auth"
import * as yup from "yup"
import { UserGender } from "../interfaces"
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
    .required(getValidateRequiredMessage)
    .oneOf(Object.keys(UserGender), getValidateInvalidMessage)
    .nullable(),
})

export function useFormUpdateProfile() {
  const dispatch = useAppDispatch()
  const { profile } = useAuth()

  const { mutate, isLoading } = useMutation("update-profile", updateProfile, {
    onSuccess(data) {
      toast.success(SuccessMessage.UPDATE_PROFILE_SUCCESS)
      dispatch(SET_PROFILE(data))
    },
    onError() {
      toast.error(ErrorMessage.INTERNAL_SERVER_ERROR)
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
