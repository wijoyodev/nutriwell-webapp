import axios from 'axios';
import Swal from 'sweetalert2';

export const setVesselType = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/ship/vessel-type`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_VESSEL_TYPE', payload: data })
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

export const setOneShipOwner = async (dispatch, shipOwnerId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/ship-owner/${shipOwnerId}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ONE_SHIP_OWNER', payload: data })
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

export const setUpdateShipOwner = async (dispatch, data, shipOwnerId) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/ship-owner/${shipOwnerId}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_SHIP_OWNER', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Update Ship Saved",
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


export const setSearchShipOwner = async (dispatch, params) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    params  : params,
    url     : `${process.env.REACT_APP_API_URL}/v1/ship-owner`,
  }

  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_SHIP_OWNER', payload: data })
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

export const setAllShipOwner = async (dispatch, page) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/ship-owner?page=${page}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ALL_SHIP_OWNER', payload: data })
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

export const setOnePorto = async (dispatch, shipId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/portfolio`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ONE_PORTO', payload: data })
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

export const setPortoCreate = async (dispatch, mainData) => {
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
      axios.post(`${process.env.REACT_APP_API_URL}/v1/ship/portfolio`, mainData, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_PORTO_CREATE', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Portofolio Created",
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

export const setPortoUpdate = async (dispatch, mainData, shipId) => {
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
      axios.put(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/portfolio`, mainData, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_PORTO_UPDATE', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Portofolio Updated",
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
    
        axios.put(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/portfolio`, mainData, {
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        },{
        }).then(({data}) => {
          dispatch({ type: 'SET_PORTO_UPDATE', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Portofolio Updated",
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

export const setOneShip = async (dispatch, shipId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/ready-stock`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ONE_READY_STOCK', payload: data })
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

export const setReadyStockCreate = async (dispatch, mainData) => {
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
      axios.post(`${process.env.REACT_APP_API_URL}/v1/ship/ready-stock`, mainData, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_READY_STOCK_CREATE', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Ready Stock Ship Created",
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

export const setReadyStockUpdate = async (dispatch, mainData, shipId) => {
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
      axios.put(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/ready-stock`, mainData, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_READY_STOCK_UPDATE', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Ready Stock Ship Updated",
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
  
        axios.put(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}/ready-stock`, mainData, {
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        },{
        }).then(({data}) => {
          dispatch({ type: 'SET_READY_STOCK_UPDATE', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Ready Stock Ship Updated",
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

export const setShipDelete = async (dispatch, shipId) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/v1/ship/${shipId}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIP_DELETE', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Ship Deleted",
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

export const setCreateShip = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/v1/ship-owner`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_CREATE_SHIP_OWNER', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Ship Owner Created",
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

export const setUpdateSiupal = async (dispatch, data, shipOwnerId) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/ship-owner/${shipOwnerId}/siupal-number`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_SIUPAL', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Update SIUPAL",
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

export const resetUpdateSiupal = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_SIUPAL'})
}

export const resetCreateShipOwner = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_SHIP_OWNER'})
}

export const resetPortoCreate = async (dispatch) => {
  dispatch({ type: 'RESET_PORTO_CREATE'})
}

export const resetPortoUpdate = async (dispatch) => {
  dispatch({ type: 'RESET_PORTO_UPDATE'})
}

export const resetCreateShipResponse = async (dispatch) => {
  dispatch({ type: 'RESET_READY_STOCK_CREATE'})
}

export const resetShipUpdate = async (dispatch) => {
  dispatch({ type: 'RESET_READY_STOCK_UPDATE'})
}

export const resetUpdateShipOwner = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_SHIP_OWNER'})
}
