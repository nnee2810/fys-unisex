import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartReducer from "./reducers/cart"
import productReducer from "./reducers/product"
import userReducer from "./reducers/user"

const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
