import { useQuery } from "react-query"
import { GetProductsDto } from "../dto/get-products-dto"
import { getProducts } from "../services/getProducts"

export function useGetProducts(data: GetProductsDto, options?: any) {
  return useQuery(["getProducts", data], () => getProducts(data), options)
}
