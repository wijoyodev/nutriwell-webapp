import axios from 'axios';
import Swal from 'sweetalert2';

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
    dispatch({ type: 'SET_ORDER_SEARCH', payload: data.result.data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
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
    console.log("setTrackshipment", data)
    dispatch({ type: 'SET_TRACK_SHIPMENT', payload: data.result.data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
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
    console.log("response error", error)
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

  // order status
  // Belum Bayar = 0 
  // Dikemas = 1
  // Dikirim = 2
  // Selesai = 3
  // Dibatalkan 4
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
    console.log("SET CHANGE ORDER STATUS")
    dispatch({ type: 'SET_CHANGE_ORDER_STATUS', payload: data.result })
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
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}