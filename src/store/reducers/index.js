import { combineReducers } from "redux"
import loginRegister from "./loginRegisterReducer"
import shipyard from "./shipyardReducer"
import supplier from "./supplierReducer"
import shipyardFacility from "./shipyardFacilityReducer"
import shipBuilding from "./shipBuildingReducer"
import banner from "./bannerReducer"
import ship from "./shipReducer"
import admin from "./adminReducer"

export default combineReducers({
  loginRegister,
  shipyard,
  shipyardFacility,
  shipBuilding,
  ship,
  supplier,
  banner,
  admin,
})
