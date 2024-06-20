const initialState = {
  allMemberResp: null,
  detailMemberResp: null,
  memberDetailResp: null,
  memberNetworkListResp: null,
  memberNetworkSummaryResp: null,
  userDetailUpdateResp: null,
  createUserResp: null,
  createMemberResp: null,
  updateMemberResp: null,
  rewardDetailResp: null,
  disbursementGeneralResp: null,
  disbursementDetailResp: null,
  allDisbursementResp: null,
  disbursementDetailMemberResp: null,
  setAllLocationResp: null,
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_MEMBER': {
      return {...state, allMemberResp: action.payload}
    }
    case 'SET_CREATE_MEMBER': {
      console.log("SET CREATE MEMBER", action.payload.data )
      return {...state, createMemberResp: action.payload.data}
    }
    case 'SET_UPDATE_MEMBER': {
      console.log("SET_UPDATE_MEMBER", action.payload.data )
      return {...state, updateMemberResp: action.payload.data}
    }
    case 'SET_ALL_LOCATION': {
      console.log("SET_ALL_LOCATION", action.payload)
      return {...state, setAllLocationResp: action.payload}
    }
    case 'SET_DETAIL_MEMBER': {
      return {...state, detailMemberResp: action.payload.data[0]}
    }
    case 'SET_DETAIL_REWARD':{
      return {...state, rewardDetailResp: action.payload}
    }
    case 'SET_ALL_DISBURSEMENT':{
      return {...state, allDisbursementResp: action.payload}
    }
    case 'SET_GENERAL_DISBURSEMENT':{
      return {...state, disbursementGeneralResp: action.payload}
    }
    case 'SET_DETAIL_DISBURSEMENT':{
      return {...state, disbursementDetailResp: action.payload}
    }
    case 'SET_DETAIL_DISBURSEMENT_MEMBER':{
      return {...state, disbursementDetailMemberResp: action.payload}
    }
    case 'SET_MEMBER_DETAIL_RESP':{
      return {...state, memberDetailResp: action.payload.data[0]}
    }
    case 'SET_MEMBER_NETWORK_LIST_RESP':{
      console.log("SET_MEMBER_NETWORK_LIST_RESP", action.payload)
      return {...state, memberNetworkListResp: action.payload}
    }
    case 'SET_MEMBER_NETWORK_SUMMARY_RESP':{
      console.log("SET_MEMBER_NETWORK_SUMMARY_RESP", action.payload)
      return {...state, memberNetworkSummaryResp: action.payload}
    }
    case 'SET_UPDATE_USER_RESP':{
      console.log("SET_UPDATE_USER_RESP", action)
      return {...state, userDetailUpdateResp: action.payload}
    }
    case 'RESET_CREATE_USER':{
      return {...state, createUserResp: null}
    }
    default:
      return state
  }
}

export default reducer
