const initialState = {
  productDetailResp: null,
  productEditResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DETAIL_RESP':{
      return {...state, productDetailResp: action.payload[0]}
    }
    case 'SET_UPDATE_PRODUCT_RESP':{
      return {...state, productEditResp: action.payload}
    }
    default:
      return state
  }
}

export default reducer
