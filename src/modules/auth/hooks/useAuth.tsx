import { AxiosError } from "axios"
import { Key, Message } from "configs/constants"
import { useAppDispatch, useAppSelector } from "hooks/useAppStore"
import Cookies from "js-cookie"
import { getUserProfile as getUserProfileService } from "modules/users/services"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import {
  authSelector,
  AuthStatus,
  SET_AUTH_STATUS,
  SIGN_IN,
  SIGN_OUT,
} from "store/reducers/auth"
import { historySelector } from "store/reducers/history"
import { SignInByPasswordDto, SignUpDto } from "../dto"
import {
  signInByPassword as signInByPasswordService,
  signUp as signUpService,
} from "../services"

export function useAuth() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { from } = useAppSelector(historySelector)
  const auth = useAppSelector(authSelector)

  const fetchProfile = async () => {
    try {
      if (Cookies.get(Key.ACCESS_TOKEN)) {
        const user = await getUserProfileService()
        dispatch(SIGN_IN(user))
      } else dispatch(SET_AUTH_STATUS(AuthStatus.UNAUTHENTICATED))
    } catch (error) {
      dispatch(SET_AUTH_STATUS(AuthStatus.UNAUTHENTICATED))
      if (error instanceof AxiosError && error?.response?.status === 401)
        Cookies.remove(Key.ACCESS_TOKEN)
    }
  }
  const signUp = useMutation(
    "signUp",
    (data: SignUpDto) => signUpService(data),
    {
      onSuccess() {
        toast.success(Message.SIGN_UP_SUCCESS)
        router.push("/auth/sign-in")
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(
            Message[error.response?.data?.message as keyof typeof Message] ||
              Message.SERVER_ERROR
          )
        } else toast.error(Message.SERVER_ERROR)
      },
    }
  )
  const signInByPassword = useMutation(
    "signInByPassword",
    (data: SignInByPasswordDto) => signInByPasswordService(data),
    {
      onSuccess: (data) => {
        Cookies.set(Key.ACCESS_TOKEN, data)
        fetchProfile()
        if (from) router.push(from)
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(
            Message[error.response?.data?.message as keyof typeof Message] ||
              Message.SERVER_ERROR
          )
        } else toast.error(Message.SERVER_ERROR)
      },
    }
  )
  const signOut = () => {
    dispatch(SIGN_OUT())
    toast.success(Message.SIGN_OUT_SUCCESS)
  }
  return { ...auth, fetchProfile, signUp, signInByPassword, signOut }
}
