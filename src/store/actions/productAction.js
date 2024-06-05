import axios from 'axios';
import Swal from 'sweetalert2';

export const setUpdateProduct = async (dispatch, data, id) => {
  console.log("setUpdateDetaiAdmin", data, id)
  axios.patch(`${process.env.REACT_APP_API_URL}/product/${id}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log("DATA set update detail admin", data)
    dispatch({ type: 'SET_UPDATE_PRODUCT_RESP', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Product Information Updated",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    setTimeout(() => { 
      window.location.reload(false);
    }, 1500)
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

export const setProductDetail = async (dispatch, adminId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/product`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    console.log(data, "<<DATA setProductDetail")
    dispatch({ type: 'SET_PRODUCT_DETAIL_RESP', payload: data.result })
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