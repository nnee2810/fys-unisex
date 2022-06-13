import { useQuery } from "react-query"
import { getProvinces } from "../services"

export function useGetProvinces() {
  return useQuery("getProvinces", getProvinces)
}
