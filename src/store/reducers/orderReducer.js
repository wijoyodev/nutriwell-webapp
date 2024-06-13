const initialState = {
  orderSearchResp:null,
  orderDetailResp:null,
  changeOrderStatusResp:null,
  vesselTypeResp:[],
  shipDeleteResp:{},
  oneReadyStockResp:null,
  portoCreateResp:null,
  readyStockCreateResp:null,
  portoUpdateResp:null,
  readyStockUpdateResp:null,
  oneShipOwnerResp:null,
  updateShipResp:null,
  updateSiupal:null,
  createShipOwnerResp:null,
  trackShipmentResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER_SEARCH': {
      console.log("SET_ORDER_SEARCH", action.payload)
      return {...state, orderSearchResp: action.payload}
    }
    case 'SET_CHANGE_ORDER_STATUS': {
      console.log("SET_CHANGE_ORDER_STATUS", action.payload)
      return {...state, changeOrderStatusResp: action.payload}
    }
    case 'SET_TRACK_SHIPMENT': {
      console.log("SET_TRACK_SHIPMENT", action.payload)
      return {...state, trackShipmentResp: action.payload}
    }
    case 'SET_ORDER_DETAIL': {
      return {...state, orderDetailResp: action.payload}
    }
    case 'SET_VESSEL_TYPE': {
      return {...state, vesselTypeResp: action.payload.data.vesselTypes}
    }
    case 'SET_SHIP_DELETE': {
      return {...state, shipDeleteResp: action.payload}
    }
    case 'SET_CREATE_SHIP_OWNER': {
      return {...state, createShipOwnerResp: action.payload}
    }
    case 'SET_UPDATE_SHIP_OWNER': {
      return {...state, updateShipResp: action.payload}
    }
    case 'SET_PORTO_CREATE': {
      return {...state, portoCreateResp: action.payload}
    }
    case 'SET_ONE_SHIP_OWNER': {
      return {...state, oneShipOwnerResp: action.payload.data}
    }
    case 'SET_PORTO_UPDATE': {
      return {...state, portoUpdateResp: action.payload}
    }
    case 'SET_UPDATE_SIUPAL': {
      return {...state, updateSiupal: action.payload}
    }
    case 'SET_ONE_READY_STOCK': {
      return {...state, oneReadyStockResp: action.payload.data.ship}
    }
    case 'SET_READY_STOCK_CREATE': {
      return {...state, readyStockCreateResp: action.payload}
    }
    case 'SET_READY_STOCK_UPDATE': {
      return {...state, readyStockUpdateResp: action.payload}
    }
    case 'RESET_PORTO_CREATE': {
      return {...state, portoCreateResp: null}
    }
    case 'RESET_PORTO_UPDATE': {
      return {...state, portoUpdateResp: null}
    }
    case 'RESET_READY_STOCK_CREATE': {
      return {...state, readyStockCreateResp: null}
    }
    case 'RESET_READY_STOCK_UPDATE': {
      return {...state, readyStockUpdateResp: null}
    }
    case 'RESET_UPDATE_SHIP_OWNER': {
      return {...state, updateShipResp: null}
    }
    case 'RESET_UPDATE_SIUPAL': {
      return {...state, updateSiupal: null}
    }
    case 'RESET_CREATE_SHIP_OWNER': {
      return {...state, createShipOwnerResp: null}
    }
    default:
      return state
  }
}

export default reducer
