import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface SliceState {}

const initialState: SliceState = {}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
})

export const cartSelector = (state: RootState) => state.cart
export const cartReducer = cartSlice.reducer
