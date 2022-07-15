import { useMutation } from "react-query"
import { updateProduct } from "../services"

export function useUpdateProduct() {
  return useMutation("update-product", updateProduct)
}
