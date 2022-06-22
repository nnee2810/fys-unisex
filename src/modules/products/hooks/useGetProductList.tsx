import { useQuery } from "react-query"
import { GetProductListDto } from "../dto"
import { getProductList } from "../services"

export function useGetProductList(data: GetProductListDto, options?: any) {
  return useQuery(["getProducts", data], () => getProductList(data), options)
}
