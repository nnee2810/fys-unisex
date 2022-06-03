import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/auth"
import cartReducer from "./reducers/cart"
import historyReducer from "./reducers/history"
import productReducer from "./reducers/product"

const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
    history: historyReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
