const initialState = {
  productDetailResp: null,
  productEditResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DETAIL_RESP':{
      console.log("SET_PRODUCT_DETAIL_RESP", action)
      return {...state, productDetailResp: action.payload[0]}
    }
    case 'SET_UPDATE_PRODUCT_RESP':{
      console.log("SET_UPDATE_PRODUCT_RESP", action)
      return {...state, productEditResp: action.payload}
    }
    default:
      return state
  }
}

export default reducer
