const initialState = {
  allAdminResp: null,
  adminDetailResp: null,
  adminDetailUpdateResp: null,
  createAdminResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_ADMIN': {
      console.log("MASUK SET ALL ADMNI", action)
      return {...state, allAdminResp: action.payload.data}
    }
    case 'SET_CREATE_ADMIN': {
      return {...state, createAdminResp: action.payload.data}
    }
    case 'SET_ADMIN_DETAIL_RESP':{
      return {...state, adminDetailResp: action.payload.data}
    }
    case 'SET_UPDATE_ADMIN_RESP':{
      console.log("SET_UPDATE_ADMIN_RESP", action)
      return {...state, adminDetailUpdateResp: action.payload}
    }
    case 'RESET_CREATE_ADMIN':{
      return {...state, createAdminResp: null}
    }
    case 'RESET_VERIFY_USER':{
      return {...state, verifyUserResp: null}
    }
    default:
      return state
  }
}

export default reducer
