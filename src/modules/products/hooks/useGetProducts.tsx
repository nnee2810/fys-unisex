import { useQuery } from "react-query"
import { GetProductsDto } from "../dto/get-products-dto"
import { getProducts } from "../services/getProducts"

export function useGetProducts(params: GetProductsDto, options?: any) {
  return useQuery(["getProducts", params], () => getProducts(params), options)
}
