const initialState = {
  serviceCategoryResp: null,
  areaResp: null,
  supplyCategoryResp: null,
  addShipyardResp: {},
  mainSuppContResp: null,
  allContractorResp: null,
  oneShipyardResp: {},
  updateSupplierResp: null,
  updateContractorResp: null,
  deleteOneShipyardResp:{},
  uploadFileResp:null,
  createSuppResp: null,
  createContResp: null,
  allSupplierResp: null,
  createSuppContResp: null,
  updateSuppContResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SERVICE_CATEGORY_RESP': {
      return {...state, serviceCategoryResp: action.payload.data.serviceCategories}
    }
    case 'SET_SUPPLY_CATEGORY_RESP': {
      return {...state, supplyCategoryResp: action.payload.data.supplyCategories}
    }
    case 'SET_AREA_RESP': {
      return {...state, areaResp: action.payload.data.areas}
    }
    case 'SET_SUPPLIER_RESP': {
      return {...state, createSuppResp: action.payload}
    }
    case 'SET_ALL_SUPPLIER_RESP': {
      return {...state, allSupplierResp: action.payload.data}
    }
    case 'SET_CREATE_SUPP_CONT_RESP': {
      return {...state, createSuppContResp: action.payload.data}
    }
    case 'SET_MAIN_SUPPLIER_CONTRACTOR_RESP': {
      return {...state, mainSuppContResp: action.payload.data.supplierContractor}
    }
    case 'SET_UPDATE_SUPPLIER_CONTRACTOR_RESP': {
      return {...state, updateSuppContResp: action.payload.data}
    }
    case 'SET_CONTRACTOR_RESP': {
      return {...state, allContractorResp: action.payload.data}
    }
    case 'SET_ONE_SHIPYARD_RESP': {
      return {...state, oneShipyardResp: action.payload.data}
    }
    case 'SET_ADD_SHIPYARD_RESP': {
      return {...state, addShipyardResp: action.payload.data}
    }
    case 'SET_UPDATE_SUPPLIER_RESP': {
      return {...state, updateSupplierResp: action.payload.data}
    }
    case 'SET_UPDATE_CONTRACTOR_RESP': {
      return {...state, updateContractorResp: action.payload.data}
    }
    case 'SET_UPLOAD_FILE': {
      return {...state, uploadFileResp: action.payload}
    }
    case 'SET_DELETE_ONE_SHIPYARD_RESP': {
      return {...state, deleteOneShipyardResp: action.payload.data}
    }
    case 'RESET_ADD_SHIPYARD_RESP':{
      return {...state, addShipyardResp: {}}
    }
    case 'RESET_UPLOAD_FILE_RESP':{
      return {...state, uploadFileResp: null}
    }
    case 'RESET_CREATE_SUPPLIER_RESP':{
      return {...state, createSuppResp: null}
    }
    case 'RESET_CREATE_CONTRACTOR_RESP':{
      return {...state, createContResp: null}
    }
    case 'RESET_CREATE_SUPP_CONT_RESP':{
      return {...state, createSuppContResp: null}
    }
    case 'RESET_UPDATE_SUPP_CONT_RESP':{
      return {...state, updateSuppContResp: null}
    }
    case 'RESET_UPDATE_SUPPLIER_RESP': {
      return {...state, updateSupplierResp: null}
    }
    case 'RESET_UPDATE_CONTRACTOR_RESP': {
      return {...state, updateContractorResp: null}
    }
    default:
      return state
  }
}

export default reducer
