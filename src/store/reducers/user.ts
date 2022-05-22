import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "interfaces/IUser"
import { RootState } from "store"

interface SliceState {
  isAuth: boolean
  profile: IUser | null
}

const initialState: SliceState = {
  isAuth: false,
  profile: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_SIGNED_IN(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload
    },
    SET_PROFILE(state, { payload }: PayloadAction<IUser>) {
      state.profile = payload
    },
  },
})

export const userSelector = (state: RootState) => state.user
export const { SET_SIGNED_IN, SET_PROFILE } = userSlice.actions
export default userSlice.reducer
