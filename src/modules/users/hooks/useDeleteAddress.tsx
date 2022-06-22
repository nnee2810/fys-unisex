import { useMutation } from "react-query"
import { deleteAddress } from "../services"

export function useDeleteAddress() {
  return useMutation("delete-address", deleteAddress)
}
