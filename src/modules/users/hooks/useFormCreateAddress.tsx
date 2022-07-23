import { yupResolver } from "@hookform/resolvers/yup"
import { formSchema } from "helpers"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { deleteWhiteSpace } from "utils"
import * as yup from "yup"
import { useCreateAddress } from "."
import { CreateAddressDto } from "../dto"

const schema = yup.object({
  name: formSchema.name,
  phone: formSchema.phone,
  province_code: formSchema.province_code,
  district_code: formSchema.district_code,
  ward_code: formSchema.ward_code,
  address_detail: formSchema.address_detail,
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

  const { mutate, isLoading } = useCreateAddress()

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
