import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegister from '../components/LoginRegister/LoginRegister';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { setForgotPassword, resetForgotPass } from '../store/actions/loginRegisterAction'

const ForgotPasswordPage = ({ dispatch, dataLoginRegister }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const requestForgotPass = (e) =>{
    e.preventDefault()
    setForgotPassword(dispatch, email, 'admin')
  }
  
  const dataField=[
    {
      label: "Forgot Password",
      type: "title",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Email",
      placeholder: "Enter Your Registered Email",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      action: setEmail,
    },{
      label: "Send",
      type: "button_submit",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Back",
      type: "button_white",
      link: "../",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  useEffect(()=>{
    if( dataLoginRegister.forgotResp ){
      resetForgotPass(dispatch)
      navigate("../")
    }
  },[dataLoginRegister.forgotResp])

  return (    
    <>
      <LoginRegister
        dataField={dataField}
        onSubmit={requestForgotPass}
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
)(ForgotPasswordPage)
