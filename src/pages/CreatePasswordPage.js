import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoginRegister from '../components/LoginRegister/LoginRegister';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { setCreatePassword, resetCreatePass } from '../store/actions/loginRegisterAction'

const CreatePasswordPage = ({ isLogin, setIsLogin, dispatch, dataLoginRegister }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
	
  const handleShowPass = (type) => {
    if( type=="conf" ){
      let curr = showConfPassword
      setShowConfPassword(!curr)
    }else{
      let curr = showPassword
      setShowPassword(!curr)
    }
  }

  const doCreatePassword = (e) => {
    e.preventDefault()
    if( newPassword !== confPassword ){
      Swal.fire({
        title: 'Error',
        text: "New password & Confirmation not equal",
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    } else {
      const data = {
        token: params.get('tkn'),
        password: newPassword,
      }
      setCreatePassword(dispatch, data)
    }
  }

  useEffect(()=>{
    if( dataLoginRegister.createPasswordResp !== null ){
      resetCreatePass(dispatch)
      navigate('../')
    }
  },[dataLoginRegister.createPasswordResp])

  const dataField=[
    {
      label: "Create New Password",
      type: "title",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Set New Password",
      placeholder: "Enter Your New Password",
      type: "password",
      spaceMd: "12",
      spaceXs: "12",
      showPassword: showPassword,
      handleShowPass: handleShowPass,
      passType: "new",
      action: setNewPassword,
      required: true,
    },{
      label: "Confirm New Password",
      placeholder: "Confirm Your New Password",
      type: "password",
      spaceMd: "12",
      spaceXs: "12",
      showPassword: showConfPassword,
      passType: "conf",
      handleShowPass: handleShowPass,
      action: setConfPassword,
      required: true,
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
    // if( isLogin === true || localStorage.getItem("token") ){
    //   localStorage.clear()
    //   setIsLogin(false)
    // } 
  },[])

  return (    
    <>
      <LoginRegister
        dataField={dataField}
        linkLogin={"shipyard"}
        onSubmit={doCreatePassword}
        linkContact={"https://api.whatsapp.com/send/?phone=085712559443&text=I%27m+interested+to+register&type=phone_number&app_absent=0"}
      />
    </>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister,
  };
};

export default connect(
  storage
)(CreatePasswordPage)

