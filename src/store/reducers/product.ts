import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetProductsDto } from "modules/products/dto/get-products-dto"

interface SliceState {
  query: GetProductsDto
}

const initialState: SliceState = {
  query: {
    name: "",
  },
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setQuery(
      state,
      {
        payload: {
          name,
          type,
          gender,
          inStock,
          isFeatured,
          isSale,
          page,
          limit,
        },
      }: PayloadAction<GetProductsDto>
    ) {
      state.query.name = name
      state.query.type = type
      state.query.gender = gender
      state.query.inStock = inStock
      state.query.isFeatured = isFeatured
      state.query.isSale = isSale
      state.query.page = page
      state.query.limit = limit
    },
  },
})

export const productSelector = (state: any) => state.product
export const { setQuery } = productSlice.actions
export default productSlice.reducer
