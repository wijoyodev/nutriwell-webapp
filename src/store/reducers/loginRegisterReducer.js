const initialState = {
  loginResp: null,
  registerResp: {},
  logoutResp: {},
  forgotResp: null,
  resetPassResp: {},
  errorResp: {},
  authResp: null,
  authUpdateResp: null,
  changePasswordResp: null,
  createPasswordResp: null,
  verifyUserResp: null,
  activeDeactiveResp: null,
  contactInfoResp:null,
  updateContactInfoResp: null,
  allAdminResp: null,
  statisticResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CREATE_PASSWORD_RESP': {
      return {...state, createPasswordResp: action.payload}
    }
    case 'SET_ALL_ADMIN': {
      return {...state, allAdminResp: action.payload}
    }
    case 'SET_STATISTIC_RESP': {
      return {...state, statisticResp: action.payload.data.totalItems}
    }
    case 'SET_ACTIVATE_DEACTIVATE_RESP': {
      return {...state, activeDeactiveResp: action.payload}
    }
    case 'SET_LOGIN_RESP': {
      return {...state, loginResp: {success: true}}
    }
    case 'SET_CHANGE_PASSWORD_RESP': {
      return {...state, changePasswordResp: {success: true}}
    }
    case 'SET_AUTH_RESP': {
      return {...state, authResp: action.payload}
    }
    case 'SET_UPDATE_AUTH_RESP': {
      return {...state, authUpdateResp: action.payload}
    }
    case 'SET_REGISTER_RESP': {
      return {...state, registerResp: action.payload}
    }
    case 'SET_LOGOUT': {
      return {...state, loginResp: {}}
    }
    case 'SET_FORGOT_RESP':{
      return {...state, forgotResp: action.payload.data}
    }
    case 'SET_VERIFY_USER':{
      return {...state, verifyUserResp: action.payload}
    }
    case 'CHANGE_PASSWORD_RESP':{
      return {...state, changePasswordResp: action.payload.data}
    }
    case 'RESET_CHANGE_PASSWORD_RESP':{
      return {...state, changePasswordResp: null}
    }
    case 'SET_RESET_PASSWORD':{
      return state.resetPassResp
    }
    case 'SET_ERROR':{
      return {...state, errorResp: action.payload}
    }
    case 'SET_CONTACT_INFO':{
      return {...state, contactInfoResp: action.payload.data.contactInformation}
    }
    case 'SET_UPDATE_CONTACT_INFO':{
      return {...state, updateContactInfoResp: action.payload}
    }
    case 'RESET_ERROR':{
      return {...state, errorResp: {}}
    }
    case 'RESET_REGISTER_RESP':{
      return {...state, registerResp: {}}
    }
    case 'RESET_CREATE_PASSWORD_RESP':{
      return {...state, createPasswordResp: null}
    }
    case 'RESET_FORGOT_RESP':{
      return {...state, forgotResp: null}
    }
    case 'RESET_VERIFY_USER':{
      return {...state, verifyUserResp: null}
    }
    default:
      return state
  }
}

export default reducer
