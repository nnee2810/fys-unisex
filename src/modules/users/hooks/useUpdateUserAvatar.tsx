import { Message } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { UpdateUserAvatarDto } from "../dto/update-user-avatar.dto"
import { updateUserAvatar } from "../services/updateUserAvatar"

export function useUpdateUserAvatar() {
  return useMutation(
    "updateUserAvatar",
    (data: UpdateUserAvatarDto) => updateUserAvatar(data),
    {
      onSuccess() {
        toast.success("Cập nhật ảnh đại điện thành công")
      },
      onError() {
        toast.error(Message.SERVER_ERROR)
      },
    }
  )
}
