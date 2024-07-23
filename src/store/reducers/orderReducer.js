const initialState = {
  orderSearchResp:null,
  changeOrderStatusResp:null,
  trackShipmentResp: null,
  orderDetailResp:null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER_SEARCH': {
      return {...state, orderSearchResp: action.payload}
    }
    case 'SET_CHANGE_ORDER_STATUS': {
      return {...state, changeOrderStatusResp: action.payload}
    }
    case 'SET_TRACK_SHIPMENT': {
      return {...state, trackShipmentResp: action.payload}
    }
    case 'SET_ORDER_DETAIL': {
      return {...state, orderDetailResp: action.payload}
    }
    case 'RESET_TRACK_SHIPMENT': {
      return {...state, trackShipmentResp: null}
    }
    default:
      return state
  }
}

export default reducer
