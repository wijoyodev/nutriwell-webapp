import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegister from '../components/LoginRegister/LoginRegister'
import { connect } from "react-redux";
import { setLoginResp, setAuthResp } from '../store/actions/loginRegisterAction'

const LoginPage = ({ dispatch, dataLoginRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const doLogin = (e) => {
    e.preventDefault()
    let data = { email, password }
    setLoginResp(dispatch, data)
  }
  // 
  const dataField=[
    {
      label: "Log In",
      type: "title",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Masukkan email dan password untuk dapat mengakses akun Anda",
      type: "sub_title",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Email",
      placeholder: "Masukkan email",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      action: setEmail,
      required: true,
    },{
      label: "Password",
      placeholder: "Masukkan password",
      type: "password",
      spaceMd: "12",
      spaceXs: "12",
      showPassword: false,
      passType: "old",
      action: setPassword,
      required: true,
    },{
      label: "Log In",
      type: "button_submit",
      link: "../shipyard",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  // useEffect(()=>{
  //   if( dataLoginRegister.loginResp ){
  //     if( dataLoginRegister.loginResp.success ){
  //       const myTimeout = setTimeout(myGreeting, 2000);

  //       function myGreeting() {
  //         window.location.reload();
  //       }
  //       myTimeout()
  //     }
  //   }
  // },[dataLoginRegister.loginResp])

  return (    
    <>
      <LoginRegister
        dataField={dataField}
        pageName={"Login as Admin"}
        onSubmit={doLogin}
      />
    </>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(LoginPage)
