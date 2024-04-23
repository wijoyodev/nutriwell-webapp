const initialState = {
  shipyardFacilityListResp:null,
  oneShipyardFacility: null,
  shipyardFacilityCreateResp:null,
  shipyardFacilityUpdateResp:null,
  shipyardFacilityDeleteResp:null,
  dockingFacilityTypeResp:null,
  oneDockingFacilityType: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHIPYARD_FACILITY_LIST': {
      return {...state, shipyardFacilityListResp: action.payload.data}
    }
    case 'SET_ONE_SHIPYARD_FACILITY': {
      const oneShipyard = state.shipyardFacilityListResp.filter((item) => item.id === action.payload)
      return {...state, oneShipyardFacility: oneShipyard[0] }
    }
    case 'SET_SHIPYARD_FACILITY_CREATE': {
      return {...state, shipyardFacilityCreateResp: action.payload}
    }
    case 'SET_SHIPYARD_FACILITY_UPDATE': {
      return {...state, shipyardFacilityUpdateResp: action.payload}
    }
    case 'SET_SHIPYARD_FACILITY_DELETE': {
      return {...state, shipyardFacilityDeleteResp: action.payload}
    }
    case 'SET_DOCKING_FACILITY_TYPE': {
      return {...state, dockingFacilityTypeResp: action.payload.data}
    }
    case 'SET_ONE_DOCKING_FACILITY_TYPE': {
      const oneFacility = state.dockingFacilityTypeResp.filter((item) => item.id === action.payload)
      return {...state, oneDockingFacilityType: oneFacility[0]}
    }
    case 'RESET_SHIPYARD_FACILITY_CREATE_RESP': {
      return {...state, shipyardFacilityCreateResp: {}}
    }
    case 'RESET_SHIPYARD_FACILITY_UPDATE_RESP': {
      return {...state, shipyardFacilityUpdateResp: {}}
    }
    case 'RESET_DATA_FACILITY_RESP':{
      return {...state, shipyardFacilityListResp: null}
    }
    case 'RESET_ONE_SHIPYARD_FACILITY': {
      return {...state, oneShipyardFacility: null }
    }
    default:
      return state
  }
}

export default reducer
