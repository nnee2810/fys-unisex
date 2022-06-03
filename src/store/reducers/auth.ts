import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Key } from "configs/constants"
import { IUser } from "interfaces/IUser"
import Cookies from "js-cookie"
import { RootState } from "store"

export enum AuthStatus {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
}

interface SliceState {
  status: AuthStatus
  profile: IUser | null
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
    SIGN_IN(state, { payload }: PayloadAction<IUser>) {
      state.status = AuthStatus.AUTHENTICATED
      state.profile = payload
    },
    SIGN_OUT(state) {
      state.status = AuthStatus.UNAUTHENTICATED
      state.profile = null
      Cookies.remove(Key.ACCESS_TOKEN)
    },
  },
})

export const authSelector = (state: RootState) => state.auth
export const { SET_AUTH_STATUS, SIGN_IN, SIGN_OUT } = authSlice.actions
export default authSlice.reducer
