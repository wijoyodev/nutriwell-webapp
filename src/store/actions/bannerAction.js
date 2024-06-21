import axios from 'axios';
import { checkResponseMessage } from '../../helper/helper'

export const setBanner = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/banner`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_BANNER', payload: data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setBannerSearch = async (dispatch, params) => {
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
    url     : `${process.env.REACT_APP_API_URL}/banner`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_BANNER_SEARCH', payload: data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setDetailBanner = async (dispatch, id) => {
  axios.get(`${process.env.REACT_APP_API_URL}/banner?id=${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Accept": "*/*",
      "ngrok-skip-browser-warning": "true" ,
      "Content-Type": "application/json"
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_DETAIL_BANNER', payload: data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setDeleteBanner = async (dispatch, id) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/banner/${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Accept": "*/*",
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  },{
  }).then(({data}) => {
    checkResponseMessage(true, "Success", "Banner Deleted")
    dispatch({ type: 'SET_DELETE_BANNER', payload: data })
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setUpdateBanner = async (dispatch, id, mainData) => {
  let files = new FormData();
  
  if(mainData.imageUrl){
    files.append('banner', mainData.imageUrl[0].file);
  }
  files.append('title', mainData.title);
  files.append('description', mainData.description);
  
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
    url     : `${process.env.REACT_APP_API_URL}/banner/${id}`,
  }
  axios(options ).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_BANNER', payload: data })
    checkResponseMessage(true, "Success", "Banner Updated")
  }).catch((error)=>{
    checkResponseMessage(false, "Error", error.response.data.message)
  })
}

export const setCreateBanner = async (dispatch, mainData) => {
  if(mainData.imageUrl.length === 0 || mainData.imageUrl === ""){
    checkResponseMessage(false, "Photo required", "Need to add Photo")
  }else{
    let files = new FormData();
    
    files.append('banner', mainData.imageUrl[0].file);
    files.append('title', mainData.title);
    files.append('description', mainData.description);
  
    axios.post(`${process.env.REACT_APP_API_URL}/banner`, files ,{
      headers: {
        "Authorization": localStorage.getItem('token'),
        "Cache-Control": "no-cache",
        'Content-Type': 'multipart/form-data',
        "Accept": "*/*",
        "ngrok-skip-browser-warning": "true" ,
      },
    },{
    }).then(({data}) => {
      dispatch({ type: 'SET_CREATE_BANNER', payload: data })
      checkResponseMessage(true, "Success", "Banner Create")
    }).catch((error)=>{
      checkResponseMessage(false, "Error", error.response.data.message)
    })
  }
}

export const resetUpdateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_BANNER' })
}

export const resetCreateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_BANNER' })
}
