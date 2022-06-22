import { yupResolver } from "@hookform/resolvers/yup"
import { SuccessMessage } from "configs/constants"
import { formSchemas } from "helpers"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace } from "utils"
import * as yup from "yup"
import { IAddressEntity } from "../interfaces"
import { useUpdateAddress } from "./useUpdateAddress"

interface UseFormUpdateAddressProps {
  data: IAddressEntity
  onClose(): void
}
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
  province_code: formSchemas.province_code,
  district_code: formSchemas.district_code,
  ward_code: formSchemas.ward_code,
  address_detail: formSchemas.address_detail,
})

export function useFormUpdateAddress({
  data,
  onClose,
}: UseFormUpdateAddressProps) {
  const queryClient = useQueryClient()
  const methods = useForm<FormValues>({
    defaultValues: {
      name: data.name,
      phone: data.phone,
      province_code: data.province_code,
      district_code: data.district_code,
      ward_code: data.ward_code,
      address_detail: data.address_detail,
      is_default: data.is_default,
    },
    resolver: yupResolver(schema),
  })
  const { mutate, isLoading } = useUpdateAddress()

  const handleSubmit = ({
    name,
    address_detail,
    ...submitData
  }: FormValues) => {
    if (
      !submitData.province_code ||
      !submitData.district_code ||
      !submitData.ward_code
    )
      return
    mutate(
      {
        id: data.id,
        name: deleteWhiteSpace(name),
        address_detail: deleteWhiteSpace(address_detail),
        ...submitData,
      },
      {
        onSuccess() {
          onClose()
          toast.success(SuccessMessage.UPDATE_ADDRESS_SUCCESS)
          queryClient.invalidateQueries("get-address-list")
        },
      }
    )
  }

  useEffect(() => {
    methods.reset(data)
  }, [data])

  return { methods, handleSubmit, isLoading }
}