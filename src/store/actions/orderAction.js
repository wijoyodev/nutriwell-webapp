import axios from 'axios';
import Swal from 'sweetalert2';

export const setAllOrder = async (dispatch) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    url     : `${process.env.REACT_APP_API_URL}/orders`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_ORDER', payload: data.result.data })
  }).catch((error)=>{
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



export const setAllShipyardByShipyardId = async (dispatch, orderId) => {
  // axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard?orderId=${orderId}`,{
  //   headers: {
  //     "Authorization": localStorage.getItem('token'),
  //     "Cache-Control": "no-cache",
  //     "Content-Type": "application/json",
  //     "Accept": "*/*",
  //   },
  // },{
  // }).then(({data}) => {
  //   dispatch({ type: 'SET_ALL_SHIPYARD_BY_SHIPYARD_ID', payload: data })
  // }).catch((error)=>{
  //   console.log("response error", error)
  //   Swal.fire({
  //     title: 'Error',
  //     text: error.response.data.message,
  //     icon: 'error',
  //     confirmButtonColor: '#1b4460',
  //   })
  // })
}

export const doDeleteOneShipyard = async (dispatch, shipyardId, shipyardName) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    Swal.fire({
      title: shipyardName,
      text: "Shipyard Deleted!",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    dispatch({ type: 'SET_DELETE_ONE_SHIPYARD_RESP', payload: data })
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

export const setUpdateDetailShipyard = async (dispatch, data, id) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/shipyard-owner/${id}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_DETAIL_SHIPYARD_RESP', payload: data })
    localStorage.setItem("shipyardId", id);
    Swal.fire({
      title: 'Success',
      text: "Shipyard Owner Information Updated",
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
    url     : `${process.env.REACT_APP_API_URL}/orders`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_ORDER', payload: data.result.data })
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

export const setAllShipyard = async (dispatch, page) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard-owner?page=${page}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ALL_SHIPYARD_RESP', payload: data })
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

export const setOneShipyard = async (dispatch, shipyardId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    localStorage.setItem("shipyardId", shipyardId);
    dispatch({ type: 'SET_ONE_SHIPYARD_RESP', payload: data })
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


export const setUpdateShipyard = async (dispatch, mainData, shipyardId) => {
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
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
    
    for( let i=0 ; i<mainData.imageUrls.length ; i++ ){
      if( mainData.imageUrls[i].file ){
        noNewImage = false
        files.append('files', mainData.imageUrls[i].file);
      }else{
        currImg.push(mainData.imageUrls[i].data_url)
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
      mainData.imageUrls = currImg
      axios.put(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}`,mainData,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      }).then(({data}) => {
        data['isSuccess'] = true
        dispatch({ type: 'SET_UPDATE_SHIPYARD_RESP', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Shipyard Information Updated",
          icon: 'success',
          confirmButtonColor: '#1b4460',
        })
      }).catch((errorResp)=>{
        errorResp['isSuccess'] = false
        dispatch({ type: 'SET_UPDATE_SHIPYARD_RESP', payload: errorResp.response })
        Swal.fire({
          title: 'Error',
          text: errorResp.response.data.message,
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
        mainData.imageUrls = imgUrls
        
        axios.put(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}`,mainData,{
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        }).then(({data}) => {
          dispatch({ type: 'SET_UPDATE_SHIPYARD_RESP', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Shipyard Information Updated",
            icon: 'success',
            confirmButtonColor: '#1b4460',
          })
          setTimeout(() => { 
            window.location.reload(false);
          }, 1500)
        }).catch((errorResp)=>{
          console.log("response error", errorResp)
          Swal.fire({
            title: 'Error',
            text: errorResp.response.data.message,
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

export const setAddShipyard = async (dispatch, mainData) => {
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    let files = new FormData();
    for( let i=0 ; i<mainData.imageUrls.length ; i++ ){
      files.append('files', mainData.imageUrls[i].file);
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
      let imgUrls = [];
      for( let i=0 ; i<data.data.fileUrls.length ; i++ ){
        imgUrls.push(data.data.fileUrls[i].url);
      }
      mainData.imageUrls = imgUrls
      axios.post(`${process.env.REACT_APP_API_URL}/v1/shipyard`, mainData,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_ADD_SHIPYARD_RESP', payload: data.data })
        localStorage.setItem("shipyardId", data.data.shipyardId);
        Swal.fire({
          title: 'Success',
          text: "Shipyard Information Updated",
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


export const setUploadFile = async (dispatch, data, section) => {
  const options = {
    method  : 'post',
    headers : {
      'Authorization': localStorage.getItem('token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*',
    },
    data    : { 
      files: data
    },
    url     : `${process.env.REACT_APP_API_URL}/v1/upload`,
  }

  axios(options).then(({data}) => {
    let dataSave = {
      url: data.data.fileUrls[0].url,
      section,
    }
    dispatch({ type: 'SET_UPLOAD_FILE', payload: dataSave })
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

export const setContractorCategory = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/contractor/service-category`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SERVICE_CATEGORY_RESP', payload: data })
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

export const setCreateContractor = async (dispatch, data) => { 
  axios.post(`${process.env.REACT_APP_API_URL}/v1/contractor`, data,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_CONTRACTOR_RESP', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Success add Contractor",
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

export const resetUploadFile = async (dispatch) => {
  dispatch({ type: 'RESET_UPLOAD_FILE_RESP' })
}

export const resetDetailShipyard = async (dispatch) => {
  dispatch({ type: 'RESET_DETAIL_SHIPYARD_RESP' })
}

export const resetAddShipyardResp = async (dispatch) => {
  dispatch({ type: 'RESET_ADD_SHIPYARD_RESP' })
}

export const resetCreateContractorResp = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_CONTRACTOR_RESP' })
}

export const resetUpdateShipyard = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_SHIPYARD_RESP' })
}

export const resetOneShipyard = async (dispatch) => {
  dispatch({ type: 'RESET_ONE_SHIPYARD_RESP' })
}
