import axios from 'axios';
import Swal from 'sweetalert2';

export const setLoginResp = async (dispatch, data) => {
  axios.post(`${process.env.REACT_APP_API_URL}/login`, data,).then(({data}) => {
    Swal.fire({
      title: 'Login Success',
      text: "Please wait..",
      icon: 'success',
    })
    console.log("data", data)
    localStorage.setItem("token", `Bearer ${data.result.token}`);
    localStorage.setItem("refresh_token", `${data.result.refreshToken}`);
    localStorage.setItem("web", `admin_web`);
    localStorage.setItem("role", `${data.result.role}`);
    localStorage.setItem('webGarenaLogedIn', true)
    localStorage.setItem("email", data.result.email);
    localStorage.setItem("full_name", data.result.full_name);
    localStorage.setItem("last_login", Date.now());
    dispatch({ type: 'SET_LOGIN_RESP', payload: data })
  }).catch((error)=>{
    Swal.fire({
      title: 'Error',
      // text: error.response.data.message,
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })
    console.log("response error", error)
  })
}

export const setLogoutResp = async (dispatch) => {
  let dataToken = {
    "user": 10,
    "token": localStorage.getItem('token'),
    "refresh_token": localStorage.getItem('refresh_token'),
  }

  axios.post(`${process.env.REACT_APP_API_URL}/refresh`,dataToken,{
    headers: {
      "authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Content-Type": "application/json"
    }
  }).then(({data}) => {
    let dataLogout = 
    {
      "email": localStorage.getItem('email'),
      "refresh_token": localStorage.getItem('refresh_token'),
    }

    localStorage.setItem("token", `Bearer ${data.result.access_token}`);
    localStorage.setItem("refresh_token", `${data.result.refresh_token}`);

    axios.post(`${process.env.REACT_APP_API_URL}/logout`,dataLogout,{
      headers: {
        "authorization": localStorage.getItem('token'),
        "ngrok-skip-browser-warning": "true" ,
        "Content-Type": "application/json"
      }
    }).then(({data}) => {
      
      Swal.fire({
        title: 'Logout Success',
        text: "Please wait..",
        icon: 'success',
      })
      dispatch({ type: 'SET_LOGOUT_RESP' })
    }).catch((error)=>{
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    })
  }).catch((error)=>{
    console.log("response error", error)
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonColor: '#1b4460',
    })

    localStorage.clear()
    const myTimeout = setTimeout(reloadFunc, 2000);

    function reloadFunc() {
      window.location.reload();
    }
    myTimeout()
  })
}

export const setRefreshToken = async (dispatch) => {
  let dataToken = {
    "user": 10,
    "token": localStorage.getItem('token'),
    "refresh_token": localStorage.getItem('refresh_token'),
  }

  axios.post(`${process.env.REACT_APP_API_URL}/refresh`,dataToken,{
    headers: {
      "authorization": localStorage.getItem('token'),
      "ngrok-skip-browser-warning": "true" ,
      "Content-Type": "application/json"
    }
  }).then(({data}) => {
    localStorage.setItem("token", `Bearer ${data.result.access_token}`);
    localStorage.setItem("refresh_token", `${data.result.refresh_token}`);
    
  }).catch((error)=>{
    console.log("ERRIR", error)
    if(error){
      Swal.fire({
        title: 'Error',
        text: 'Session Expired Please Re-Login',
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })

      localStorage.clear()
      const myTimeout = setTimeout(reloadFunc, 2000);

      function reloadFunc() {
        window.location.reload();
      }
      myTimeout()
    }
  })
}
