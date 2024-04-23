const initialState = {
  shipBuildingDetailResp:null,
  shipBuildingCreateResp:null,
  shipBuildingUpdateResp:null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHIP_BUILDING_DETAIL': {
      return {...state, shipBuildingDetailResp: action.payload.data}
    }
    case 'SET_SHIP_BUILDING_CREATE': {
      return {...state, shipBuildingCreateResp: action.payload}
    }
    case 'SET_SHIP_BUILDING_UPDATE': {
      return {...state, shipBuildingUpdateResp: action.payload}
    }
    case 'RESET_SHIP_BUILDING_RESP': {
      return {...state, shipBuildingDetailResp:null}
    }
    case 'RESET_SHIP_BUILDING_UPDATE': {
      return {...state, shipBuildingUpdateResp:null}
    }
    case 'RESET_SHIP_BUILDING_CREATE': {
      return {...state, shipBuildingCreateResp:null}
    }
    default:
      return state
  }
}

export default reducer
