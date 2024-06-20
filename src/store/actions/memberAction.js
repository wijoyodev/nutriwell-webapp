import axios from 'axios';
import Swal from 'sweetalert2';

export const setCreateMember = async (dispatch, data) => {
  console.log("setCreateMember", data)
  
  let files = new FormData();
  files.append('avatar', data.avatar[0].file);
  files.append('email', data.email);
  files.append('status', data.status);
  files.append('gender', data.gender);
  files.append('full_name', data.full_name);
  files.append('phone_number_country', data.phone_number_country);
  files.append('phone_number', data.phone_number);
  files.append('date_of_birth', data.date_of_birth);
  files.append('referrer_code', data.referrer_code);
  files.append('password', data.password);
  files.append('confirm_password', data.confirm_password);

  axios.post(`${process.env.REACT_APP_API_URL}/register`, files, {
    headers: {
      'Authorization': localStorage.getItem('token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*',
      "ngrok-skip-browser-warning": "true" ,
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

export const setUpdateMember = async (dispatch, id, mainData) => {
    console.log(mainData,"<< main data")
    let files = new FormData();
    
    if(mainData.avatar){
      files.append('avatar', mainData.avatar[0].file);
    }
    files.append('full_name', mainData.full_name);
    files.append('email', mainData.email);
    files.append('phone_number', mainData.phone_number);
    files.append('date_of_birth', mainData.date_of_birth);
    files.append('account_bank', mainData.account_bank);
    files.append('account_bank_name', mainData.account_bank_name);
    files.append('account_bank_number', mainData.account_bank_number);
    
    const options = {
      method  : 'patch',
      headers : {
        'Authorization': localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
        "ngrok-skip-browser-warning": "true" ,
      },
      data    : files,
      url     : `${process.env.REACT_APP_API_URL}/user/${id}`,
    }
    axios(options ).then(({data}) => {
      dispatch({ type: 'SET_UPDATE_MEMBER', payload: data })
      Swal.fire({
        title: 'Success',
        text: "Member Updated",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
    }).catch((error)=>{
      console.log("response error", error)
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
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

export const setAllLocation = async (dispatch) => {
  console.log("setAllLocation")
  axios.get(`${process.env.REACT_APP_API_URL}/address?filter=true`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log("DATA sSET_ALL_LOCATION", data)
    dispatch({ type: 'SET_ALL_LOCATION', payload: data.result })
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
