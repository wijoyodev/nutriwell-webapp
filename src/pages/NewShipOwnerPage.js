import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { setCreateShip, resetCreateShipOwner } from '../store/actions/shipAction'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const NewShipOwnerPage = ({ dispatch, dataShip })  =>  {
  const [progress, setProgress] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfPassword, setShowConfPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [picName, setPicName] = useState("");
  const [picPhoneNumber, setPicPhoneNumber] = useState("");
  const [siupalNumber, setSiupalNumber] = useState("");
  const navigate = useNavigate()
	
  const handleShowPass = (passType) => {
    if (passType === "old"){
      let curr = showPassword
      setShowPassword(!curr)
    }else{
      let curr = showConfPassword
      setShowConfPassword(!curr)
    }
  }

  const doCreateShip = (e) => {
    e.preventDefault()
    if( password !== confPassword ){
      Swal.fire({
        title: 'Error',
        text: "Password and confirmation not same",
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    }else{
      let data = {
        email,
        phoneNumber,
        password,
        companyName,
        companyEmail,
        companyAddress,
        siupalNumber,
        picName,
        picPhoneNumber,
      }
      setCreateShip(dispatch, data)
    }
  }

  useEffect(()=>{
    if( dataShip.createShipOwnerResp ){
      resetCreateShipOwner(dispatch)
      navigate('../shipOwner')
    }
  },[dataShip.createShipOwnerResp])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const dataForm = [
    {
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setEmail,
    },{
      label: "Phone Number",
      type: "text",
      placeholder: "Input Phone Number",
      spaceMd: "6",
      spaceXs: "12",
      action: setPhoneNumber,
      required: true,
    },{
      label: "Password",
      type: "password",
      placeholder: "Input Password",
      spaceMd: "6",
      spaceXs: "12",
      passType: "old",
      showPassword: showPassword,
      action: setPassword,
      handleShowPass: handleShowPass,
      required: true,
    },{
      label: "Confirm Password",
      type: "password",
      placeholder: "Input Confirm Password",
      spaceMd: "6",
      spaceXs: "12",
      passType: "confirm",
      showPassword: showConfPassword,
      action: setConfPassword,
      handleShowPass: handleShowPass,
      required: true,
    },{
      label: "Company Profile",
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Company Name",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "12",
      action: setCompanyName,
      required: true,
    },{
      label: "Company Address",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "6",
      spaceXs: "12",
      action: setCompanyAddress,
      required: true,
    },{
      label: "Company Email",
      type: "text",
      placeholder: "Input Company Email",
      spaceMd: "6",
      spaceXs: "12",
      action: setCompanyEmail,
      required: true,
    },{
      label: "Person In Charge",
      type: "text",
      placeholder: "Input Person In Charge",
      spaceMd: "6",
      spaceXs: "12",
      action: setPicName,
      required: true,
    },{
      label: "PIC's Phone Number",
      type: "text",
      placeholder: "Input PIC's Phone Number",
      spaceMd: "6",
      spaceXs: "12",
      action: setPicPhoneNumber,
      required: true,
    },{
      label: "SIUPAL Number",
      type: "text",
      placeholder: "Input SIUPAL Number",
      spaceMd: "6",
      spaceXs: "12",
      action: setSiupalNumber,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "4",
      spaceXs: "4",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "4",
      spaceXs: "4",
      link: "../shipOwner"
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"Ship Owner Detail"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={doCreateShip}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataShip: state.ship,
  };
};

export default connect(
  storage
)(NewShipOwnerPage)
