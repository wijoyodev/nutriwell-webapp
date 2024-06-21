import axios from 'axios';
import { checkResponseMessage } from '../../helper/helper'

export const setAllAdmin = async (dispatch, page, filter) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    params  : filter ,
    url     : `${process.env.REACT_APP_API_URL}/user?offset=${page}&userType=admin`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_ADMIN', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setCreateAdmin = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/register/admin`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_CREATE_ADMIN', payload: data })
    checkResponseMessage(true, "Success", "Admin Added Successfully")
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setUpdateDetaiAdmin = async (dispatch, data, id) => {
  axios.patch(`${process.env.REACT_APP_API_URL}/user/${id}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_ADMIN_RESP', payload: data })
    checkResponseMessage(true, "Success", "Admin Information Updated")
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
  })
}

export const setAdminById = async (dispatch, adminId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/user/${adminId}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ADMIN_DETAIL_RESP', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
  })
}

export const setSearchAdmin = async (dispatch, params) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    params  : params,
    url     : `${process.env.REACT_APP_API_URL}/v1/admin`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_ADMIN', payload: data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setAllMember = async (dispatch) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/user?role=4`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_MEMBER', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const resetCreateAdmin = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_ADMIN' })
}
