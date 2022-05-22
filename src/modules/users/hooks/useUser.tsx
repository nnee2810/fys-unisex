import { AxiosError } from "axios"
import { KEY, MESSAGE } from "configs/constants"
import Cookies from "js-cookie"
import { SignInByPasswordDto } from "modules/auth/dto/sign-in-by-password.dto"
import { SignUpDto } from "modules/auth/dto/sign-up.dto"
import { signInByPassword as signInByPasswordService } from "modules/auth/services/signInByPassword"
import { signUp as signUpService } from "modules/auth/services/signUp"
import { getProfile } from "modules/users/services/getProfile"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { SET_PROFILE, SET_SIGNED_IN, userSelector } from "store/reducers/user"
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppStore"

export default function useUser() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const fetchProfile = () => {
    if (Cookies.get(KEY.ACCESS_TOKEN))
      getProfile()
        .then((data) => {
          dispatch(SET_SIGNED_IN(true))
          dispatch(SET_PROFILE(data))
        })
        .catch((error) => {
          if (error?.response?.status === 401) Cookies.remove(KEY.ACCESS_TOKEN)
        })
  }
  const signUp = useMutation("signUp", (data: SignUpDto) => signUpService(data))
  const signInByPassword = useMutation(
    "signInByPassword",
    (data: SignInByPasswordDto) => signInByPasswordService(data),
    {
      onSuccess: (data) => {
        Cookies.set(KEY.ACCESS_TOKEN, data.accessToken)
        fetchProfile()
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || MESSAGE.ERROR)
        } else toast.error(MESSAGE.ERROR)
      },
    }
  )
  const signOut = () => {
    dispatch(SET_SIGNED_IN(false))
  }

  return {
    ...user,
    fetchProfile,
    signUp,
    signInByPassword,
    signOut,
  }
}
