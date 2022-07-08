import { useMutation } from "react-query"
import { updatePhone } from "../services"

export function useUpdatePhone() {
  return useMutation("update-phone", updatePhone)
}
