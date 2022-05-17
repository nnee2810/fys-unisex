import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

const initialState = {
  signedIn: false,
  profile: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

export const userSelector = (state: RootState) => state.user
// export const {} = userSlice.actions
export default userSlice.reducer
