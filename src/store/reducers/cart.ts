import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
})

export const cartSelector = (state: any) => state.cart
export default cartSlice.reducer
