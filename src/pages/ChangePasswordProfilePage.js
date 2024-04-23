import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import MainForm from '../components/MainForm/MainForm'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setChangePassword, resetChangePass } from '../store/actions/loginRegisterAction'

const ChangePasswordProfilePage = ({ dispatch, dataLoginRegister }) => {
	const [showCurrPassword, setShowCurrPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const [currPassword, setCurrPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate()
	
  const handleShowPass = (passType) => {
    if( passType === "new" ){
      let curr = showNewPassword
      setShowNewPassword(!curr)
    } else if( passType === "curr" ) {
      let curr = showCurrPassword
      setShowCurrPassword(!curr)
    } else {
      let curr = showConfPassword
      setShowConfPassword(!curr)
    }
  }

  const doUpdatePassword = (e) => {
    e.preventDefault()
    if( newPassword !== confPassword ){
      Swal.fire({
        title: 'Error',
        text: "New password & Confirmation not equal",
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    } else {
      setChangePassword(dispatch, currPassword, newPassword)
    }
  }

  useEffect(()=>{
    if( dataLoginRegister.changePasswordResp ){
      resetChangePass(dispatch)
      navigate('../myAccount')
    }
  },[dataLoginRegister.changePasswordResp])

  const dataForm = [
    {
      label: "Current Password",
      type: "password",
      placeholder: "Input Current Password",
      passType: "curr",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      handleShowPass: handleShowPass,
      showPassword: showCurrPassword, 
      action: setCurrPassword,
    },{
      label: "",
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "New Password",
      type: "password",
      placeholder: "Input New Password",
      passType: "new",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      handleShowPass: handleShowPass,
      showPassword: showNewPassword, 
      action: setNewPassword,
    },{
      label: "",
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Confirm New Password",
      type: "password",
      placeholder: "Input Confirm New Password",
      passType: "confirm",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      handleShowPass: handleShowPass,
      showPassword: showConfPassword,
      action: setConfPassword,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Back",
      link: "../myAccount",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
    }
  ]

  return (    
    <div className="container_right_form vh-100">
      <MainForm
        pageName={"Change Password"}
        dataForm={dataForm}
        onSubmit={doUpdatePassword}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(ChangePasswordProfilePage)  
