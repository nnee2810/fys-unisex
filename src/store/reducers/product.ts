import { createSlice } from "@reduxjs/toolkit"

interface SliceState {}

const initialState: SliceState = {}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
})

export const productSelector = (state: any) => state.product
export default productSlice.reducer
