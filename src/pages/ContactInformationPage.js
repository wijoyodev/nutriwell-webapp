import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setContactInfo, setUpdateContactInfo } from '../store/actions/loginRegisterAction'
import MainForm from '../components/MainForm/MainForm'

const ContactInformationPage = ({ dispatch, dataLoginRegister })  =>  {
  const [progress, setProgress] = useState(true);
  const [email, setEmail] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(null);

  useEffect(()=>{
    setContactInfo(dispatch)
  },[])

  useEffect(()=>{
    if( dataLoginRegister.contactInfoResp ){
      setEmail(dataLoginRegister.contactInfoResp.email)
      setWhatsappNumber(dataLoginRegister.contactInfoResp.whatsappNumber)
    }
  },[dataLoginRegister.contactInfoResp])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const saveChanges = (e) => {
    e.preventDefault()
    const data = {
      email,
      whatsappNumber,
    }
    setUpdateContactInfo(dispatch, data)
  }

  const dataForm = [
    {
      label: "Gapal Contact Information",
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Email",
      type: "text",
      placeholder: "Input Gapal Contact Email",
      spaceMd: "6",
      spaceXs: "6",
      value: email,
      required: true,
      action: setEmail,
    },{
      label: "Whatsapp Number",
      type: "text",
      placeholder: "eg: +6285712559443 ",
      spaceMd: "6",
      spaceXs: "6",
      required: true,
      value: whatsappNumber,
      action: setWhatsappNumber,
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "4",
      spaceXs: "4",
    }
  ]

  return (    
    <div className="container_right_form vh-100">
      <MainForm
        pageName={"Contact Information"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={saveChanges}
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
)(ContactInformationPage)  
