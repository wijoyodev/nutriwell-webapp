const initialState = {
  allAdminResp: null,
  adminDetailResp: null,
  adminDetailUpdateResp: null,
  createAdminResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_ADMIN': {
      return {...state, allAdminResp: action.payload}
    }
    case 'SET_CREATE_ADMIN': {
      return {...state, createAdminResp: action.payload.data}
    }
    case 'SET_ADMIN_DETAIL_RESP':{
      return {...state, adminDetailResp: action.payload.data}
    }
    case 'SET_UPDATE_ADMIN_RESP':{
      return {...state, adminDetailUpdateResp: action.payload}
    }
    case 'RESET_CREATE_ADMIN':{
      return {...state, createAdminResp: null}
    }
    default:
      return state
  }
}

export default reducer
