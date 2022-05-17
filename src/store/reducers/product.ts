import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface SliceState {}

const initialState: SliceState = {}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
})

export const productSelector = (state: RootState) => state.product
export default productSlice.reducer
