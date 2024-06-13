import axios from 'axios';
import { MdDescription } from 'react-icons/md';
import Swal from 'sweetalert2';

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
    console.log("setBanner RESPONSE", data)
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
  axios.get(`${process.env.REACT_APP_API_URL}/banner?id=${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
      "ngrok-skip-browser-warning": "true" ,
      "Content-Type": "application/json"
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
  axios.delete(`${process.env.REACT_APP_API_URL}/banner/${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
      "ngrok-skip-browser-warning": "true" ,
      "Content-Type": "application/json"
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
  // if(mainData.imageUrl.length === 0 || mainData.imageUrl === ""){
    // Swal.fire({
    //   title: 'Photo required',
    //   text: "Need to add Photo",
    //   icon: 'warning',
    //   confirmButtonColor: '#1b4460',
    // })
  // }else{
    console.log(mainData,"<< main data")
    let files = new FormData();
    let noNewImage = true
    let currImg = []
    
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
    
    // if( noNewImage ){
    //   mainData.imageUrl = currImg[0]
    //   axios.patch(`${process.env.REACT_APP_API_URL}/banner/${id}`, mainData ,{
    //     headers: {
    //       "Authorization": localStorage.getItem('token'),
    //       "Cache-Control": "no-cache",
    //       "Content-Type": "application/json",
    //       "Accept": "*/*",
    //       "ngrok-skip-browser-warning": "true" ,
    //       "Content-Type": "application/json"
    //     },
    //   },{
    //   }).then(({data}) => {
    //     dispatch({ type: 'SET_UPDATE_BANNER', payload: data })
    //     Swal.fire({
    //       title: 'Success',
    //       text: "Banner Updated",
    //       icon: 'success',
    //       confirmButtonColor: '#1b4460',
    //     })
    //   }).catch((error)=>{
    //     console.log("response error", error)
    //     Swal.fire({
    //       title: 'Error',
    //       text: error.response.data.message,
    //       icon: 'error',
    //       confirmButtonColor: '#1b4460',
    //     })
    //   })
    // }else{
      // axios(options).then(({data}) => {
      //   let imgUrls = [...currImg];
      //   for( let i=0 ; i<data.data.fileUrls.length ; i++ ){
      //     imgUrls.push(data.data.fileUrls[i].url);
      //   }
      //   mainData.imageUrl = imgUrls[0]
  
        axios(options ).then(({data}) => {
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
      // }).catch((error)=>{
      //   console.log("response error", error)
      //   Swal.fire({
      //     title: 'Error',
      //     text: error.response.data.message,
      //     icon: 'error',
      //     confirmButtonColor: '#1b4460',
      //   })
      // })
    // }
  }
// }

export const setCreateBanner = async (dispatch, mainData) => {
  if(mainData.imageUrl.length === 0 || mainData.imageUrl === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    // let files = new FormData();
    // for( let i=0 ; i<mainData.imageUrl.length ; i++ ){
    //   files.append('files', mainData.imageUrl[i].file);
    // }
    
    // const options = {
    //   method  : 'post',
    //   headers : {
    //     'Authorization': localStorage.getItem('token'),
    //     'Cache-Control': 'no-cache',
    //     'Content-Type': 'multipart/form-data',
    //     'Accept': '*/*',
    //     "ngrok-skip-browser-warning": "true" ,
    //     "Content-Type": "application/json"
    //   },
    //   data    : files,
    //   url     : `${process.env.REACT_APP_API_URL}/upload`,
    // }
  
    // axios(options).then(({data}) => {
    //   mainData.imageUrl = data.data.fileUrls[0].url
    
      console.log(mainData,"<< main data")
      let files = new FormData();
      let noNewImage = true
      let currImg = []
      
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
      // })
    // }).catch((error)=>{
    //   console.log("response error", error)
    //   Swal.fire({
    //     title: 'Error',
    //     text: error.response.data.message,
    //     icon: 'error',
    //     confirmButtonColor: '#1b4460',
    //   })
    })
  }
}

export const resetUpdateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_BANNER' })
}

export const resetCreateBanner = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_BANNER' })
}
