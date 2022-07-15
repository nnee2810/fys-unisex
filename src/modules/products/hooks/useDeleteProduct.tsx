import { useMutation } from "react-query"
import { deleteProduct } from "../services"

export function useDeleteProduct() {
  return useMutation("delete-product", deleteProduct)
}
