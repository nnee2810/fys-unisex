import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

const initialState = {}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
})

export const cartSelector = (state: RootState) => state.cart
export default cartSlice.reducer
