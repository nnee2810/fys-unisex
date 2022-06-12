import { useQuery } from "react-query"
import { getProduct } from "../services"

export function useGetProduct(id: string) {
  return useQuery(["getProduct", id], () => getProduct(id))
}
