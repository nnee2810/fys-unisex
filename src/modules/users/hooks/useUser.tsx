import { Message } from "configs/constants"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { UpdateUserAvatarDto } from "../dto/update-user-avatar.dto"
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto"
import { updateUserAvatar as updateUserAvatarService } from "../services/updateUserAvatar"
import { updateUserProfile as updateUserProfileService } from "../services/updateUserProfile"

export default function useUser() {
  const updateUserProfile = useMutation(
    "updateUserProfile",
    (data: UpdateUserProfileDto) => updateUserProfileService(data),
    {
      onSuccess() {
        toast.success("Cập nhật tài khoản thành công")
      },
      onError() {
        toast.error(Message.ERROR)
      },
    }
  )
  const updateUserAvatar = useMutation(
    "updateUserAvatar",
    (data: UpdateUserAvatarDto) => updateUserAvatarService(data),
    {
      onSuccess() {
        toast.success("Cập nhật ảnh đại điện thành công")
      },
      onError() {
        toast.error(Message.ERROR)
      },
    }
  )

  return {
    updateUserProfile,
    updateUserAvatar,
  }
}
