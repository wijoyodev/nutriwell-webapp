const initialState = {
  islandResp: {},
  addShipyardResp: null,
  allShipyardResp: null,
  oneShipyardResp: null,
  updateShipyardResp: null,
  deleteOneShipyardResp:{},
  uploadFileResp: null,
  supplyCategoryResp: null,
  areaResp: null,
  serviceCategoryResp: null,
  createContResp: null,
  detailShipyardResp: null,
  allShipyardByShipyardIdResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SERVICE_CATEGORY_RESP': {
      return {...state, serviceCategoryResp: action.payload.data.serviceCategories}
    }
    case 'SET_ISLAND_RESP': {
      return {...state, islandResp: action.payload}
    }
    case 'SET_ALL_SHIPYARD_RESP': {
      return {...state, allShipyardResp: action.payload}
    }
    case 'SET_CONTRACTOR_RESP': {
      return {...state, createContResp: action.payload}
    }
    case 'SET_SUPPLY_CATEGORY_RESP': {
      return {...state, supplyCategoryResp: action.payload.data.supplyCategories}
    }
    case 'SET_AREA_RESP': {
      return {...state, areaResp: action.payload.data.areas}
    }
    case 'SET_ONE_SHIPYARD_RESP': {
      return {...state, oneShipyardResp: action.payload.data}
    }
    case 'SET_DETAIL_SHIPYARD_RESP': {
      return {...state, detailShipyardResp: action.payload.data}
    }
    case 'SET_ADD_SHIPYARD_RESP': {
      return {...state, addShipyardResp: action.payload}
    }
    case 'SET_ALL_SHIPYARD_BY_SHIPYARD_ID': {
      return {...state, allShipyardByShipyardIdResp: action.payload.data}
    }
    case 'SET_UPDATE_SHIPYARD_RESP': {
      return {...state, updateShipyardResp: action.payload}
    }
    case 'SET_UPLOAD_FILE': {
      return {...state, uploadFileResp: action.payload}
    }
    case 'SET_DELETE_ONE_SHIPYARD_RESP': {
      return {...state, deleteOneShipyardResp: action.payload.data}
    }
    case 'RESET_ADD_SHIPYARD_RESP':{
      return {...state, addShipyardResp: null}
    }
    case 'RESET_UPDATE_SHIPYARD_RESP':{
      return {...state, updateShipyardResp: null}
    }
    case 'RESET_UPLOAD_FILE_RESP':{
      return {...state, uploadFileResp: null}
    }
    case 'RESET_DETAIL_SHIPYARD_RESP':{
      return {...state, detailShipyardResp: null}
    }
    case 'RESET_ONE_SHIPYARD_RESP':{
      return {...state, oneShipyardResp: null}
    }
    default:
      return state
  }
}

export default reducer
