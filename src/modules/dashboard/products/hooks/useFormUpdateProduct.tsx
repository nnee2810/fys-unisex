import { UpdateProductDto } from "modules/products/dto"
import { useUpdateProduct } from "modules/products/hooks"
import { IProductEntity } from "modules/products/interfaces"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

interface UseFormUpdateProductProps {
  data?: IProductEntity
  onClose(): void
}

export function useFormUpdateProduct({
  data,
  onClose,
}: UseFormUpdateProductProps) {
  const queryClient = useQueryClient()
  const methods = useForm<UpdateProductDto>()
  const { mutate, isLoading } = useUpdateProduct()

  const handleSubmit = methods.handleSubmit((data: UpdateProductDto) => {
    mutate(data, {
      onSuccess() {
        onClose()
        toast.success("Cập nhật sản phẩm thành công")
        queryClient.invalidateQueries("get-product-list")
      },
    })
  })

  useEffect(() => {
    if (data) {
      const { images, created_at, updated_at, ...formValues } = data
      methods.reset(formValues)
    }
  }, [data])

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
