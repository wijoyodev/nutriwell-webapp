import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { setCreateAdmin, resetCreateAdmin } from '../store/actions/adminAction'

const NewAdminPage = ({ dispatch, dataAdmin }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
	
  const handleShowPass = (type) => {
    if( type === "conf" ){
      let curr = showConfPassword
      setShowConfPassword(!curr)
    }else{
      let curr = showPassword
      setShowPassword(!curr)
    }
  }

  const doRegister = (e) => {
    e.preventDefault()
    if( newPassword !== confPassword ){
      Swal.fire({
        title: 'Error',
        text: "New password & Confirmation not equal",
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    } else {
      const dataRegister = {
        name,
        email,
        password: newPassword,
      }
      setCreateAdmin(dispatch, dataRegister)
    }
  }

  useEffect(()=>{
    if( dataAdmin.createAdminResp ){
      resetCreateAdmin(dispatch)
      navigate("../adminManagement")
    }
  },[dataAdmin.createAdminResp, dispatch])

  const dataForm = [
    {
      label: "Name",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setName,
    },{
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setEmail,
    },{
      label: "Set New Password",
      placeholder: "Enter Your New Password",
      type: "password",
      spaceMd: "12",
      spaceXs: "12",
      showPassword: showPassword,
      passType: "old",
      required: true,
      action: setNewPassword,
      handleShowPass: handleShowPass,
    },{
      label: "Confirm New Password",
      placeholder: "Confirm Your New Password",
      type: "password",
      spaceMd: "12",
      spaceXs: "12",
      showPassword: showConfPassword,
      passType: "conf",
      required: true,
      action: setConfPassword,
      handleShowPass: handleShowPass,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../adminManagement"
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      link: "../accountReview"
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"New Admin"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        onSubmit={doRegister}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataAdmin: state.admin,
  };
};

export default connect(
  storage
)(NewAdminPage)
