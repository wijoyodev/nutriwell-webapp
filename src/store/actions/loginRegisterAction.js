import axios from 'axios';
import { admin_role, shipyard_role } from '../../helper/properties'
import Swal from 'sweetalert2';

export const setStatistic = async (dispatch, data) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : data,
    url     : `${process.env.REACT_APP_API_URL}/v1/statistic/total/item`,
  }

  // axios(options).then(({data}) => {
  //   dispatch({ type: 'SET_STATISTIC_RESP', payload: data })
  // }).catch((error)=>{
  //   Swal.fire({
  //     title: 'Error',
  //     text: error.response.data.message,
  //     icon: 'error',
  //     confirmButtonColor: '#1b4460',
  //   })
  //   console.log("response error", error)
  // })
}

export const setLoginResp = async (dispatch, data) => {
  console.log("masuk setLoginResp", data , process.env.REACT_APP_API_URL)
  // dispatch({ type: 'SET_LOGIN_RESP', payload: data })
  axios.post(`${process.env.REACT_APP_API_URL}/login`, data,
  {
    // headers: {
    //   "X-Account-Role": admin_role,
    // }
  },{
  }).then(({data}) => {
    console.log(data,"<<setLoginResp DATA RESPONSE API ")
    localStorage.setItem("token", `Bearer ${data.data.token}`);
    localStorage.setItem("web", `admin_web`);
    localStorage.setItem("email", data.email);
    localStorage.setItem("full_name", data.data.full_name);
    localStorage.setItem("last_login", Date.now());
    dispatch({ type: 'SET_LOGIN_RESP', payload: data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      // text: error.response.data.message,
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
    console.log("response error", error)
  })
}

export const setLogoutResp = async (dispatch) => {
  // dispatch({ type: 'SET_LOGOUT_RESP', payload: data })
  axios.post(`${process.env.REACT_APP_API_URL}/logout`, 
  {
    "email": localStorage.getItem('email'),
    "refresh_token": localStorage.getItem('token'),
  },
  {
    // headers: {
    //   "X-Account-Role": admin_role,
    // }
  },{
  }).then(({data}) => {
    console.log(data,"<<setLogoutResp DATA RESPONSE API ")
    // localStorage.setItem("token", `Bearer ${data.data.token}`);
    // localStorage.setItem("web", `admin_web`);
    // localStorage.setItem("full_name", data.data.full_name);
    // localStorage.setItem("last_login", Date.now());
    dispatch({ type: 'SET_LOGOUT_RESP' })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      // text: error.response.data.message,
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
    console.log("response error", error)
  })
}

export const setActiveDeactive = async (dispatch, mainData) => {
  let word = mainData.isActive ? 'activated' : 'deactivated' 

  const options = {
    method  : 'post',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : mainData,
    url     : `${process.env.REACT_APP_API_URL}/v1/auth/activation`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ACTIVATE_DEACTIVATE_RESP', payload: data })
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
    Swal.fire({
      title: 'Success',
      text: `Account ${mainData.companyName} is ${word}`,
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setAuthResp = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/user`,
  {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log(data, "<data")
    if( !localStorage.getItem('email') ){
      setTimeout(() => { 
        window.location.reload(false);
      }, 100)
    }
    localStorage.setItem("adminId", data.data.admin.id);
    localStorage.setItem("email", data.data.admin.email);
    localStorage.setItem("name", data.data.admin.name);
    dispatch({ type: 'SET_AUTH_RESP', payload: data.data.admin })
  }).catch((error)=>{
    console.log(error, "error")
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
    console.log("response error", error)
  })
}

export const setUpdateAuthResp = async (dispatch,data) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/auth/me`,data,
  {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_AUTH_RESP', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Success update data profile",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
    console.log("response error", error)
  })
}

export const setRegisterResp = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/register`, data,
    {
      headers: {
        "X-Account-Role": shipyard_role,
      }
    },{
    }).then(({data}) => {
      dispatch({ type: 'SET_REGISTER_RESP', payload: data })
      Swal.fire({
        title: 'Success',
        text: data.data.message,
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

export const setForgotPassword = async (dispatch, email, role) => {
  const options = {
    method  : 'post',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : {
      email: email,
      role: role,
    },
    url     : `${process.env.REACT_APP_API_URL}/v1/auth/reset-password/request`,
  }

  axios(options).then(({data}) => {
      Swal.fire({
        title: 'Success',
        text: "Email reset password sent",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
      // setTimeout(() => { 
      //   window.location.reload(false);
      // }, 1500)
      dispatch({ type: 'SET_FORGOT_RESP', payload: data })
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

export const setCreatePassword = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/reset-password`,data,{
    }).then(({data}) => {
      dispatch({ type: 'SET_CREATE_PASSWORD_RESP', payload: data })
      Swal.fire({
        title: 'Success',
        text: data.data.message,
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

export const setChangePassword = async (dispatch, showCurrPassword, showNewPassword) => {
  const options = {
    method  : 'post',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : {
      currentPassword: showCurrPassword,
      newPassword: showNewPassword,
    },
    url     : `${process.env.REACT_APP_API_URL}/v1/auth/me/change-password`,
  }

  axios(options).then(({data}) => {
    Swal.fire({
      title: 'Success',
      text: 'Password has been successfuly changed',
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    dispatch({ type: 'CHANGE_PASSWORD_RESP', payload: data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setVerifyUser = async (dispatch, data) => {
  const options = {
    method  : 'post',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : data,
    url     : `${process.env.REACT_APP_API_URL}/v1/auth/verify`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_VERIFY_USER', payload: data })
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
    Swal.fire({
      title: 'Success',
      text: data.data.message,
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setContactInfo = async (dispatch) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/v1/help-centre/contact-information`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_CONTACT_INFO', payload: data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setUpdateContactInfo = async (dispatch, data) => {
  const options = {
    method  : 'put',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : data,
    url     : `${process.env.REACT_APP_API_URL}/v1/help-centre/contact-information`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_CONTACT_INFO', payload: data })
    Swal.fire({
      title: 'Success',
      text: `Success update contact information`,
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const resetRegisterResp = async (dispatch) => {
  dispatch({ type: 'RESET_REGISTER_RESP' })
}

export const resetError = async (dispatch) => {
  dispatch({ type: 'RESET_ERROR' })
}

export const resetChangePass = async (dispatch) => {
  dispatch({ type: 'RESET_CHANGE_PASSWORD_RESP' })
}

export const resetCreatePass = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_PASSWORD_RESP' })
}

export const resetForgotPass = async (dispatch) => {
  dispatch({ type: 'RESET_FORGOT_RESP' })
}

export const resetVerifyUser = async (dispatch) => {
  dispatch({ type: 'RESET_VERIFY_USER' })
}
