import axios from 'axios';
import { checkResponseMessage } from '../../helper/helper'

export const setAllOrder = async (dispatch, page, paramFilter) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    params  : paramFilter,
    url     : `${process.env.REACT_APP_API_URL}/order?offset=${page}`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ORDER_SEARCH', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setTrackShipment = async (dispatch, shipNum) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/order/track/` + shipNum,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_TRACK_SHIPMENT', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setSearchOrders = async (dispatch, params) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    params  : params,
    url     : `${process.env.REACT_APP_API_URL}/order`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ORDER_SEARCH', payload: data.result.data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setChangeOrderStatus = async (dispatch, orderId, params) => {
  const options = {
    method  : 'patch',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    data    : params,
    url     : `${process.env.REACT_APP_API_URL}/order/${orderId}`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_CHANGE_ORDER_STATUS', payload: data.result })
    checkResponseMessage(true, "Sukses", "Sukese mengganti status")
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setDetailOrder = async (dispatch, id) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/order/${id}`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ORDER_DETAIL', payload: data.result[0] })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
  })
}

export const resetTrackShipment = async (dispatch) => {
  dispatch({ type: 'RESET_TRACK_SHIPMENT'})
}