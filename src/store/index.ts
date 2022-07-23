import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./reducers/auth"
import { cartReducer } from "./reducers/cart"
import { historyReducer } from "./reducers/history"
import { productReducer } from "./reducers/product"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    history: historyReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
