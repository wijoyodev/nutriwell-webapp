import axios from 'axios';
import { checkResponseMessage } from '../../helper/helper'

export const setUpdateProduct = async (dispatch, data, id) => {
  let files = new FormData();

  if( data.imagesUrl ){
    for( let i = 0 ; i<data.imagesUrl.length ; i++ ){
      files.append('product', data.imagesUrl[i].file);
    }
  }
  files.append('price', data.price);
  files.append('description', data.description);
  files.append('product_name', data.product_name);

  axios.patch(`${process.env.REACT_APP_API_URL}/product/${id}`, files, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      'Content-Type': 'multipart/form-data',
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_PRODUCT_RESP', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
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
    dispatch({ type: 'SET_PRODUCT_DETAIL_RESP', payload: data.result })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
  })
}