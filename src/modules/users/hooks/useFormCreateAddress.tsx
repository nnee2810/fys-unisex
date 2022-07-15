import { yupResolver } from "@hookform/resolvers/yup"
import { formSchemas } from "helpers"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace } from "utils"
import * as yup from "yup"
import { CreateAddressDto } from "../dto"
import { createAddress } from "../services"

const schema = yup.object({
  name: formSchemas.name,
  phone: formSchemas.phone,
  province_code: formSchemas.province_code,
  district_code: formSchemas.district_code,
  ward_code: formSchemas.ward_code,
  address_detail: formSchemas.address_detail,
})

export function useFormCreateAddress(onClose: () => void) {
  const queryClient = useQueryClient()
  const methods = useForm<CreateAddressDto>({
    defaultValues: {
      name: "",
      phone: "",
      address_detail: "",
      is_default: false,
    },
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation("create-address", createAddress)

  const handleSubmit = methods.handleSubmit(
    ({
      name,
      address_detail,
      province_code,
      district_code,
      ward_code,
      ...data
    }: CreateAddressDto) => {
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
            onClose()
            toast.success("Thêm địa chỉ thành công")
            queryClient.invalidateQueries("get-address-list")
          },
        }
      )
    }
  )

  return { methods, handleSubmit, isLoading }
}
