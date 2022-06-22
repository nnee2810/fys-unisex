import { useQuery } from "react-query"
import { getProduct } from "../services"

export function useGetProduct(id: string) {
  return useQuery(["get-product", id], () => getProduct(id))
}
