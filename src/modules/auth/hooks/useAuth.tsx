import { AxiosError } from "axios"
import { Key } from "configs/constants"
import { useAppDispatch, useAppSelector } from "hooks"
import Cookies from "js-cookie"
import { getProfile } from "modules/users/services/getProfile"
import { toast } from "react-toastify"
import {
  authSelector,
  AuthStatus,
  SET_AUTH_STATUS,
  SET_PROFILE,
  SIGN_OUT,
} from "store/reducers/auth"

export function useAuth() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(authSelector)

  const fetchProfile = async () => {
    try {
      if (Cookies.get(Key.ACCESS_TOKEN)) {
        const profile = await getProfile()
        dispatch(SET_PROFILE(profile))
      } else dispatch(SET_AUTH_STATUS(AuthStatus.UNAUTHENTICATED))
    } catch (error) {
      dispatch(SET_AUTH_STATUS(AuthStatus.UNAUTHENTICATED))
      if (error instanceof AxiosError && error?.response?.status === 401)
        Cookies.remove(Key.ACCESS_TOKEN)
    }
  }
  const signOut = () => {
    dispatch(SIGN_OUT())
    toast.success("Đăng xuất thành công")
  }

  return { ...auth, fetchProfile, signOut }
}
