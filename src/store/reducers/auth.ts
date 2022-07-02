import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Key } from "configs/constants"
import Cookies from "js-cookie"
import { IUserEntity } from "modules/users/interfaces"
import { RootState } from "store"

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
    SET_PROFILE_AVATAR_SRC(state, { payload }: PayloadAction<string>) {
      if (state.profile)
        state.profile.avatar = {
          src: payload,
        }
    },
    SET_PROFILE(_, { payload }: PayloadAction<IUserEntity>) {
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
export const {
  SET_AUTH_STATUS,
  SET_PROFILE_AVATAR_SRC,
  SET_PROFILE,
  SIGN_OUT,
} = authSlice.actions
export const authReducer = authSlice.reducer
