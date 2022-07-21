import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Key } from "configs/constants"
import { IUserEntity } from "interfaces/entities"
import Cookies from "js-cookie"
import { RootState } from "store"
import { getAwsCloudFrontUrl } from "utils"

export enum AuthStatus {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
}

interface SliceState {
  status: AuthStatus
  profile: IUserEntity | null
}

const initialState: SliceState = {
  status: AuthStatus.LOADING,
  profile: null,
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
      state.profile.avatar = getAwsCloudFrontUrl(payload)
    },
    SET_PROFILE(_, { payload }: PayloadAction<IUserEntity>) {
      if (payload?.avatar) payload.avatar = getAwsCloudFrontUrl(payload.avatar)
      return {
        status: AuthStatus.AUTHENTICATED,
        profile: payload,
      }
    },
    SIGN_OUT() {
      Cookies.remove(Key.ACCESS_TOKEN)
      return {
        status: AuthStatus.UNAUTHENTICATED,
        profile: null,
      }
    },
  },
})

export const authSelector = (state: RootState) => state.auth
export const { SET_AUTH_STATUS, SET_AVATAR, SET_PROFILE, SIGN_OUT } =
  authSlice.actions
export const authReducer = authSlice.reducer
