import axios from 'axios';
import { checkResponseMessage } from '../../helper/helper'

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
)

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

export const setUpdateProduct = async (dispatch, data, id) => {
  let files = new FormData();

  const filePromises = data.imagesUrl.map(image => {
    if (image.file) {
      files.append('product', image.file);
      return Promise.resolve();
    } else {
      return toDataURL(image.data_url)
        .then(dataUrl => {
          var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
          files.append('product', fileData);
        });
    }
  });

  await Promise.all(filePromises);

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
    dispatch({ type: 'SET_PRODUCT_DETAIL_RESP', payload: data.result.data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error)
  })
}