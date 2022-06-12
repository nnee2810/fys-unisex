import { useQuery } from "react-query"
import { GetProductsDto } from "../dto"
import { getProducts } from "../services"

export function useGetProducts(data: GetProductsDto, options?: any) {
  return useQuery(["getProducts", data], () => getProducts(data), options)
}
