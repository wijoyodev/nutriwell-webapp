import axios from 'axios';
import Swal from 'sweetalert2';

export const setBanner = async (dispatch, section) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/banner?bannerType=${section}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_BANNER', payload: data })
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

export const setBannerOrder = async (dispatch, mainData) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/banner/reorder`, mainData,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_BANNER_ORDER', payload: data })
    Swal.fire({
      title: 'Success',
      text: `Success reorder ${mainData.bannerType} banner`,
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
      text: error.response.data.message,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
  })
}

export const setDetailBanner = async (dispatch, id) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/banner/${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_DETAIL_BANNER', payload: data })
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

export const setDeleteBanner = async (dispatch, id) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/v1/banner/${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    Swal.fire({
      title: 'Success',
      text: "Banner Deleted",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    dispatch({ type: 'SET_DELETE_BANNER', payload: data })
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

export const setUpdateBanner = async (dispatch, id, mainData) => {
  if(mainData.imageUrl.length === 0 || mainData.imageUrl === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    let files = new FormData();
    let noNewImage = true
    let currImg = []
  
    for( let i=0 ; i<mainData.imageUrl.length ; i++ ){
      if( mainData.imageUrl[i].file ){
        noNewImage = false
        files.append('files', mainData.imageUrl[i].file);
      }else{
        currImg.push(mainData.imageUrl[i].data_url)
      }
    }
    
    const options = {
      method  : 'post',
      headers : {
        'Authorization': localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
      data    : files,
      url     : `${process.env.REACT_APP_API_URL}/v1/upload`,
    }
    
    if( noNewImage ){
      mainData.imageUrl = currImg[0]
      axios.put(`${process.env.REACT_APP_API_URL}/v1/banner/${id}`, mainData ,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_UPDATE_BANNER', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Banner Updated",
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
    }else{
      axios(options).then(({data}) => {
        let imgUrls = [...currImg];
        for( let i=0 ; i<data.data.fileUrls.length ; i++ ){
          imgUrls.push(data.data.fileUrls[i].url);
        }
        mainData.imageUrl = imgUrls[0]
  
        axios.put(`${process.env.REACT_APP_API_URL}/v1/banner/${id}`, mainData ,{
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        },{
        }).then(({data}) => {
          dispatch({ type: 'SET_UPDATE_BANNER', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Banner Updated",
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
  }
}

export const setCreateBanner = async (dispatch, mainData) => {
  if(mainData.imageUrl.length === 0 || mainData.imageUrl === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    let files = new FormData();
    for( let i=0 ; i<mainData.imageUrl.length ; i++ ){
      files.append('files', mainData.imageUrl[i].file);
    }
    
    const options = {
      method  : 'post',
      headers : {
        'Authorization': localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
      data    : files,
      url     : `${process.env.REACT_APP_API_URL}/v1/upload`,
    }
  
    axios(options).then(({data}) => {
      mainData.imageUrl = data.data.fileUrls[0].url
      axios.post(`${process.env.REACT_APP_API_URL}/v1/banner`, mainData ,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_CREATE_BANNER', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Banner Create",
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
}

export const resetBanner = async (dispatch) => {
  dispatch({ type: 'RESET_BANNER' })
}

export const resetUpdateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_BANNER' })
}

export const resetCreateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_BANNER' })
}
