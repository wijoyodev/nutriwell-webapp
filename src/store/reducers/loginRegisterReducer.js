const initialState = {
  loginResp: null,
  logoutResp: {},
  activeDeactiveResp: null,
  allAdminResp: null,
  logout: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_ADMIN': {
      return {...state, allAdminResp: action.payload}
    }
    case 'SET_ACTIVATE_DEACTIVATE_RESP': {
      return {...state, activeDeactiveResp: action.payload}
    }
    case 'SET_LOGOUT_RESP': {
      return {...state, logoutResp: {success: true}}
    }
    case 'SET_LOGIN_RESP': {
      return {...state, loginResp: {success: true}}
    }
    case 'SET_LOGOUT': {
      return {...state, loginResp: {}}
    }
    default:
      return state
  }
}

export default reducer
