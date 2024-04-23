import axios from 'axios';
import Swal from 'sweetalert2';

export const setDockingFacilityType = async (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard/docking-facility-type`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_DOCKING_FACILITY_TYPE', payload: data })
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

export const setShipyardFacilityList = async (dispatch, shipyardId) => {
  axios.get(`${process.env.REACT_APP_API_URL}/v1/shipyard/${shipyardId}/shipyard-facility`,{
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIPYARD_FACILITY_LIST', payload: data })
  }).catch((error)=>{
    console.log("response error", error)
  })
}

export const setOneShipyardFacility = async (dispatch, facilityId) => {
  dispatch({ type: 'SET_ONE_SHIPYARD_FACILITY', payload: facilityId })
}

export const resetOneShipyardFacility = async (dispatch) => {
  dispatch({ type: 'RESET_ONE_SHIPYARD_FACILITY' })
}

export const setOneDockingFacilityType = async (dispatch, facilityTypeId) => {
  dispatch({ type: 'SET_ONE_DOCKING_FACILITY_TYPE', payload: facilityTypeId })
}

export const setShipyardFacilityCreate = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/v1/shipyard/shipyard-facility`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIPYARD_FACILITY_CREATE', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Shipyard Facility Created",
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

export const setShipyardFacilityUpdate = async (dispatch, data, shipyardFacilityId) => {
  axios.put(`${process.env.REACT_APP_API_URL}/v1/shipyard/shipyard-facility/${shipyardFacilityId}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIPYARD_FACILITY_UPDATE', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Shipyard Facility Updated",
      icon: 'success',
      confirmButtonColor: '#1b4460',
    })
    // setTimeout(() => { 
    //   window.location.reload(false);
    // }, 1500)
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

export const setShipyardFacilityDelete = async (dispatch, shipyardFacilityId) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/v1/shipyard/shipyard-facility/${shipyardFacilityId}`, {
    headers: {
      "Authorization": localStorage.getItem('token'),
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
  },{
  }).then(({data}) => {
    dispatch({ type: 'SET_SHIPYARD_FACILITY_DELETE', payload: data })
    Swal.fire({
      title: 'Success',
      text: "Shipyard Facility Deleted",
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

export const resetCreateFacilityResponse = async (dispatch) => {
  dispatch({ type: 'RESET_SHIPYARD_FACILITY_CREATE_RESP'})
}

export const resetUpdateFacilityResponse = async (dispatch) => {
  dispatch({ type: 'RESET_SHIPYARD_FACILITY_UPDATE_RESP'})
}

export const resetDataFacilityResp = async (dispatch) => {
  dispatch({ type: 'RESET_DATA_FACILITY_RESP' })
}