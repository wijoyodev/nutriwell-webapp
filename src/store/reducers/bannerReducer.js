const initialState = {
  bannerDetailResp: null,
  bannerUpdateResp: null,
  bannerCreateResp: null,
  bannerDeleteResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BANNER': {
      console.log("SET_BANNER", action)
      return {...state, bannerListResp: action.payload.result}
    }
    case 'SET_CREATE_BANNER': {
      return {...state, bannerCreateResp: action.payload}
    }
    case 'SET_BANNER_SEARCH': {
      return {...state, bannerListResp: action.payload.result}
    }
    case 'SET_DETAIL_BANNER': {
      return {...state, bannerDetailResp: action.payload.result[0]}
    }
    case 'SET_UPDATE_BANNER': {
      return {...state, bannerUpdateResp: action.payload.data}
    }
    case 'SET_DELETE_BANNER': {
      return {...state, bannerDeleteResp: action.payload.data}
    }
    case 'RESET_CREATE_BANNER':{
      return {...state, bannerCreateResp: null}
    }
    case 'RESET_UPDATE_BANNER':{
      return {...state, bannerUpdateResp: null}
    }
    default:
      return state
  }
}

export default reducer
