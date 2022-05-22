import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"

interface SliceState {
  from: string
  to: string
}

const initialState: SliceState = {
  from: "",
  to: "",
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    SET_FROM(state, { payload }: PayloadAction<string>) {
      state.from = payload
    },
    SET_TO(state, { payload }: PayloadAction<string>) {
      state.to = payload
    },
    CLEAR_HISTORY(state) {
      state = initialState
    },
  },
})

export const historySelector = (state: RootState) => state.history
export const { SET_FROM, SET_TO, CLEAR_HISTORY } = historySlice.actions
export default historySlice.reducer
