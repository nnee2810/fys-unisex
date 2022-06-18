import { yupResolver } from "@hookform/resolvers/yup"
import { SuccessMessage } from "configs/constants"
import { formSchemas } from "helpers"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace, getValidateRequiredMessage } from "utils"
import * as yup from "yup"
import { createAddress } from "../services"

interface FormValues {
  name: string
  phone: string
  province_code?: number
  district_code?: number
  ward_code?: number
  address_detail: string
  is_default: boolean
}

const schema = yup.object({
  name: formSchemas.name,
  phone: formSchemas.phone,
  province_code: yup
    .number()
    .label("Tỉnh/Thành phố")
    .required(getValidateRequiredMessage),
  district_code: yup
    .number()
    .label("Quận/Huyện")
    .required(getValidateRequiredMessage),
  ward_code: yup
    .number()
    .label("Phường/Xã")
    .required(getValidateRequiredMessage),
  address_detail: yup.string(),
})

export function useFormCreateAddress(onClose: () => void) {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address_detail: "",
      is_default: false,
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation("createAddress", createAddress)

  const handleSubmit = ({
    name,
    address_detail,
    province_code,
    district_code,
    ward_code,
    ...data
  }: FormValues) => {
    if (!province_code || !district_code || !ward_code) return
    mutate(
      {
        ...data,
        name: deleteWhiteSpace(name),
        province_code,
        district_code,
        ward_code,
        address_detail: deleteWhiteSpace(address_detail),
      },
      {
        onSuccess() {
          toast.success(SuccessMessage.CREATE_ADDRESS_SUCCESS)
          methods.reset()
          onClose()
        },
      }
    )
  }

  return { methods, handleSubmit, isLoading }
}
