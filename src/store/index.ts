import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  authReducer,
  cartReducer,
  historyReducer,
  productReducer,
} from "./reducers"

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    cart: cartReducer,
    history: historyReducer,
    product: productReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
