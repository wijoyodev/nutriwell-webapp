import axios from 'axios';
import Swal from 'sweetalert2';

export const setShipBuildingDetail = async (dispatch, shipyardId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}/ship-building`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIP_BUILDING_DETAIL', payload: data })
  }).catch((error)=>{
    console.log("response error", error)
  })
}

export const setShipBuildingCreate = async (dispatch, data, shipyardId) => {
  if(data.vesselTypeIds.length === 0){
    Swal.fire({
      title: 'Vessel types Required',
      text: "Need to select Vessel types",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    axios.post(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}/ship-building`, data, {
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
        text: "Ship Building Created",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
      dispatch({ type: 'SET_SHIP_BUILDING_CREATE', payload: data })
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
}

export const setShipBuildingUpdate = async (dispatch, data, shipBuildingId) => {
  if(data.vesselTypeIds.length === 0){
    Swal.fire({
      title: 'Vessel types Required',
      text: "Need to select Vessel types",
      icon: 'warning',
      confirmButtonColor: '#1b4460',
    })
  }else{
    axios.put(`${process.env.REACT_APP_API_URL}/v1/shipyard/ship-building/${shipBuildingId}`, data, {
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
        text: "Ship Building Updated",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
      dispatch({ type: 'SET_SHIP_BUILDING_UPDATE', payload: data })
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

export const resetShipBuilding = async (dispatch) => {
  dispatch({ type: 'RESET_SHIP_BUILDING_RESP'})
}

export const resetShipBuildingUpdate = async (dispatch) => {
  dispatch({ type: 'RESET_SHIP_BUILDING_UPDATE'})
}

export const resetShipBuildingCreate = async (dispatch) => {
  dispatch({ type: 'RESET_SHIP_BUILDING_CREATE'})
}
