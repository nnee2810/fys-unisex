import { useQuery } from "react-query"
import { getAddressList } from "../services"

export function useGetAddressList() {
  return useQuery("get-address-list", getAddressList)
}
