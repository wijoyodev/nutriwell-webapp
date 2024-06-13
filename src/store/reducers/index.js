import { combineReducers } from "redux"
import loginRegister from "./loginRegisterReducer"
import banner from "./bannerReducer"
import admin from "./adminReducer"
import order from "./orderReducer"
import member from "./memberReducer"
import product from "./productReducer"

export default combineReducers({
  loginRegister,
  banner,
  admin,
  member,
  product,
  order,
})
