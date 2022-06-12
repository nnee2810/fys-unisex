import { Message } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { UpdateUserProfileDto } from "../dto"
import { updateUserProfile } from "../services"

export function useUpdateUserProfile() {
  return useMutation(
    "updateUserProfile",
    (data: UpdateUserProfileDto) => updateUserProfile(data),
    {
      onSuccess() {
        toast.success("Cập nhật tài khoản thành công")
      },
      onError() {
        toast.error(Message.SERVER_ERROR)
      },
    }
  )
}
