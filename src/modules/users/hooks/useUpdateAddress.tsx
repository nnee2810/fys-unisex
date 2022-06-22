import { useMutation } from "react-query"
import { updateAddress } from "../services"

export function useUpdateAddress() {
  return useMutation("update-address", updateAddress)
}
