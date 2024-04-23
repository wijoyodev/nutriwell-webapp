import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { setAuthResp, setUpdateAuthResp, setChangePassword } from '../store/actions/loginRegisterAction'

const MyAccountPage = ({
  dispatch,
  dataLoginRegister
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const doUpdateProfile = (e) => {
    e.preventDefault()
    const data = {
      name,
      email,
    }
    setUpdateAuthResp(dispatch, data)
  }

  useEffect(()=>{
    if(localStorage.getItem('web')){
      setAuthResp(dispatch)
    }
  },[])

  useEffect(()=>{
    if( dataLoginRegister.authResp ){
      const data = dataLoginRegister.authResp
      setName(data.name)
      setEmail(data.account.email)
    }
  },[dataLoginRegister.authResp])

  const dataForm = [
    {
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "6",
      notEditable: true,
      value: email,
      required: true,
      action: setEmail,
    },{
      label: "",
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "name",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "6",
      spaceXs: "6",
      required: true,
      value: name,
      action: setName,
    },{
      label: "",
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Change Password",
      type: "link",
      spaceMd: "12",
      spaceXs: "12",
      link: "../changePassword"
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
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
        pageName={"My Account"}
        dataForm={dataForm}
        onSubmit={doUpdateProfile}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister,
    dataShipyard: state.shipyard,
  };
};

export default connect(
  storage
)(MyAccountPage)

