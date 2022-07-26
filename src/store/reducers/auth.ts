import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Key } from "configs/constants"
import { IUserEntity, UserRole } from "interfaces/entities"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { RootState } from "store"

export enum AuthStatus {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
}

interface SliceState {
  status: AuthStatus
  profile: IUserEntity
}

const initialState: SliceState = {
  status: AuthStatus.LOADING,
  profile: {
    id: "",
    name: "",
    phone: "",
    avatar: "",
    role: UserRole.GUEST,
    gender: undefined,
    created_at: "",
    updated_at: "",
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_STATUS(state, { payload }: PayloadAction<AuthStatus>) {
      state.status = payload
    },
    SET_AVATAR(state, { payload }: PayloadAction<string>) {
      if (!state.profile) return
      state.profile.avatar = payload
    },
    SET_PROFILE(_, { payload }: PayloadAction<IUserEntity>) {
      return {
        status: AuthStatus.AUTHENTICATED,
        profile: payload,
      }
    },
    SIGN_OUT() {
      toast.success("Đăng xuất thành công")
      Cookies.remove(Key.ACCESS_TOKEN)
      return { ...initialState, status: AuthStatus.UNAUTHENTICATED }
    },
  },
})

export const authSelector = (state: RootState) => state.auth
export const { SET_AUTH_STATUS, SET_AVATAR, SET_PROFILE, SIGN_OUT } =
  authSlice.actions
export const authReducer = authSlice.reducer
