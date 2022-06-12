import { Message } from "configs/constants"
import { useAppDispatch } from "hooks/useAppStore"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_PROFILE_AVATAR_SRC } from "store/reducers/auth"
import { updateUserAvatar } from "../services"

export function useUpdateUserAvatar() {
  const dispatch = useAppDispatch()

  return useMutation(
    "updateUserAvatar",
    (data: FormData) => updateUserAvatar(data),
    {
      onSuccess(data) {
        toast.success("Cập nhật ảnh đại điện thành công")
        dispatch(SET_PROFILE_AVATAR_SRC(data))
      },
      onError() {
        toast.error(Message.SERVER_ERROR)
      },
    }
  )
}
