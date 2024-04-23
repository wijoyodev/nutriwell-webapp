import axios from 'axios';
import Swal from 'sweetalert2';

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

export const setSearchSupplierOwner = async (dispatch, params) => {
  const options = {
    method  : 'get',
    headers : {
      'Authorization': localStorage.getItem('token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    params  : params,
    url     : `${process.env.REACT_APP_API_URL}/v1/supplier-contractor`,
  }

  
  axios(options).then(({data}) => {
    dispatch({ type: 'SET_ALL_SUPPLIER_RESP', payload: data })
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


export const setAllSupplier = async (dispatch, page) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/supplier-contractor?page=${page}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_ALL_SUPPLIER_RESP', payload: data })
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

export const setCreateSuppCont = async (dispatch, data) => {
  if( !data.ArticlesOfIncorperationUrl || !data.TaxpayerIDNumberUrl || !data.BusinessIDNumberUrl || !data.DecreeOfKemenkumhamUrl ){
    Swal.fire({
      title: 'File(s) Needed',
      text: 'Kindly upload all files required',
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    axios.post(`${process.env.REACT_APP_API_URL}/v1/supplier-contractor`, data,{
      headers: {
        "Authorization": localStorage.getItem('token'),
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Accept": "*/*",
      },
    },{
    }).then(({data}) => {
      dispatch({ type: 'SET_CREATE_SUPP_CONT_RESP', payload: data })
      localStorage.setItem("supplierContractorId", data.data.supplierContractorId);
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

export const setSupplyCategoryData = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/supplier/supply-category`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SUPPLY_CATEGORY_RESP', payload: data })
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

export const setAreaResp = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/location/area`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_AREA_RESP', payload: data })
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

export const setCreateSupplier = async (dispatch, mainData) => { 
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else if(mainData.areaIds.length === 0 || mainData.supplyCategoryIds.length ===0 ){
    Swal.fire({
      title: 'Category & Area required',
      text: "Need to select Supply Category & Supply Area",
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
      axios.post(`${process.env.REACT_APP_API_URL}/v1/supplier`, mainData,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_SUPPLIER_RESP', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Success add Supplier",
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

export const setCreateContractor = async (dispatch, mainData) => { 
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else if(mainData.areaIds.length === 0 || mainData.serviceCategoryIds.length ===0 ){
    Swal.fire({
      title: 'Category & Area required',
      text: "Need to select Service Category & Service Area",
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
  
      axios.post(`${process.env.REACT_APP_API_URL}/v1/contractor`, mainData,{
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

export const setMainSupplierContractor = async (dispatch, id) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/supplier-contractor/${id}`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_MAIN_SUPPLIER_CONTRACTOR_RESP', payload: data })
  }).catch((error)=>{
    console.log("response error", error)
  })
}

export const setUpdateSupplierContractor = async (dispatch, id, data) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/supplier-contractor/${id}`,data,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_UPDATE_SUPPLIER_CONTRACTOR_RESP', payload: data })
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

export const setUpdateSupplier = async (dispatch, mainData, supplierId) => {
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else if(mainData.areaIds.length === 0 || mainData.supplyCategoryIds.length ===0 ){
    Swal.fire({
      title: 'Category & Area required',
      text: "Need to select Supply Category & Supply Area",
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
      axios.put(`${process.env.REACT_APP_API_URL}/v1/supplier/${supplierId}`, mainData,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_UPDATE_SUPPLIER_RESP', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Supplier Information Updated",
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
        mainData.imageUrls = imgUrls
        
        axios.put(`${process.env.REACT_APP_API_URL}/v1/supplier/${supplierId}`,mainData,{
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        }).then(({data}) => {
          dispatch({ type: 'SET_UPDATE_SUPPLIER_RESP', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Supplier Information Updated",
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

export const setUpdateContractor = async (dispatch, mainData, contractorId) => {
  if(mainData.imageUrls.length === 0 || mainData.imageUrls === ""){
    Swal.fire({
      title: 'Photo required',
      text: "Need to add Photo",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else if(mainData.areaIds.length === 0 || mainData.serviceCategoryIds.length ===0 ){
    Swal.fire({
      title: 'Category & Area required',
      text: "Need to select Service Category & Service Area",
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
      axios.put(`${process.env.REACT_APP_API_URL}/v1/contractor/${contractorId}`, mainData,{
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      },{
      }).then(({data}) => {
        dispatch({ type: 'SET_UPDATE_CONTRACTOR_RESP', payload: data })
        Swal.fire({
          title: 'Success',
          text: "Contractor Information Updated",
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
    }else{
      axios(options).then(({data}) => {
        let imgUrls = [...currImg];
        for( let i=0 ; i<data.data.fileUrls.length ; i++ ){
          imgUrls.push(data.data.fileUrls[i].url);
        }
        mainData.imageUrls = imgUrls
        
        axios.put(`${process.env.REACT_APP_API_URL}/v1/contractor/${contractorId}`,mainData,{
          headers: {
            "Authorization": localStorage.getItem('token'),
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        }).then(({data}) => {
          dispatch({ type: 'SET_UPDATE_CONTRACTOR_RESP', payload: data })
          Swal.fire({
            title: 'Success',
            text: "Contractor Information Updated",
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

export const resetUploadFile = async (dispatch) => {
  dispatch({ type: 'RESET_UPLOAD_FILE_RESP' })
}

export const resetCreateSupplierResp = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_SUPPLIER_RESP' })
}

export const resetCreateContractorResp = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_CONTRACTOR_RESP' })
}

export const resetCreateSuppContResp = async (dispatch) => {
  dispatch({ type: 'RESET_CREATE_SUPP_CONT_RESP' })
}

export const resetUpdateSupplierContractor = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_SUPP_CONT_RESP' })
}

export const resetUpdateSupplier = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_SUPPLIER_RESP' })
}

export const resetUpdateContractor = async (dispatch) => {
  dispatch({ type: 'RESET_UPDATE_CONTRACTOR_RESP' })
}