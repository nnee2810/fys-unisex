import { yupResolver } from "@hookform/resolvers/yup"
import { formSchema } from "helpers"
import { IAddressEntity } from "interfaces/entities"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace } from "utils"
import * as yup from "yup"
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
  name: formSchema.name,
  phone: formSchema.phone,
  province_code: formSchema.province_code,
  district_code: formSchema.district_code,
  ward_code: formSchema.ward_code,
  address_detail: formSchema.address_detail,
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
          toast.success("Cập nhật địa chỉ thành công")
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
