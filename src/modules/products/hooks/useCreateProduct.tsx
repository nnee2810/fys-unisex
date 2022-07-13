import { useMutation } from "react-query"
import { createProduct } from "../services"

export function useCreateProduct() {
  return useMutation("create-product", createProduct)
}
