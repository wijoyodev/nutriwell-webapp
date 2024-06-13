import axios from 'axios';
import Swal from 'sweetalert2';

export const setCreateMember = async (dispatch, data) => {
  console.log("setCreateMember", data)
  axios.patch(`${process.env.REACT_APP_API_URL}/register`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log("DATA sSET_CREATE_MEMBER", data)
    dispatch({ type: 'SET_CREATE_MEMBER', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Create Member Success",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
  }).catch((error)=>{
    console.log("response error", error)
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDetailMember = async (dispatch,id) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/user?userType=member&id=${id}`,
  }

  axios(options).then(({data}) => {
    console.log("DATA member NIH" ,data.result)
    dispatch({ type: 'SET_DETAIL_MEMBER', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setRewardDetail = async (dispatch,id) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/reward?user_id=${id}`,
  }

  axios(options).then(({data}) => {
    console.log("SET_DETAIL_REWARD" ,data.result)
    dispatch({ type: 'SET_DETAIL_REWARD', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDisbursementList = async (dispatch, page, filter) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    params  : filter,
    url     : `${process.env.REACT_APP_API_URL}/disbursement?offset=${page}`,
  }

  axios(options).then(({data}) => {
    console.log("SET_ALL_DISBURSEMENT" ,data.result)
    dispatch({ type: 'SET_ALL_DISBURSEMENT', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDisbursementGeneral = async (dispatch,id) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/disbursement?status=COMPLETED&user_id=${id}`,
  }

  axios(options).then(({data}) => {
    console.log("SET_GENERAL_DISBURSEMENT" ,data.result)
    dispatch({ type: 'SET_GENERAL_DISBURSEMENT', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDisbursementDetail = async (dispatch,id) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/disbursement?user_id=${id}`,
  }

  axios(options).then(({data}) => {
    console.log("SET_DETAIL_DISBURSEMENT" ,data.result)
    dispatch({ type: 'SET_DETAIL_DISBURSEMENT', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDisbursementMemberDetail = async (dispatch,id, disbId) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/disbursement?user_id=${id}&id=${disbId}`,
  }

  axios(options).then(({data}) => {
    console.log("SET_DETAIL_DISBURSEMENT_MEMBER" ,data.result)
    dispatch({ type: 'SET_DETAIL_DISBURSEMENT_MEMBER', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setNetworkById = async (dispatch, page=0, memberId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/network?offset=${page}&user_id=${memberId}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log(data, "<<DATA ssetNetworkById")
    dispatch({ type: 'SET_MEMBER_NETWORK_LIST_RESP', payload: data.result })
  }).catch((error)=>{
    console.log("response error", error)
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setNetworkSummaryById = async (dispatch, memberId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/network/status?user_id=${memberId}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log(data, "<<DATA ssetNetworkById")
    dispatch({ type: 'SET_MEMBER_NETWORK_SUMMARY_RESP', payload: data.result })
  }).catch((error)=>{
    console.log("response error", error)
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setAllMember = async (dispatch, page, search) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    params : search,
    url     : `${process.env.REACT_APP_API_URL}/user?userType=member&offset=${page}`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_MEMBER', payload: data.result })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const resetCreateAdmin = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_ADMIN' })
}
