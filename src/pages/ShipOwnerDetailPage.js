import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import {  
  setOneShipOwner, 
  setUpdateShipOwner, 
  resetUpdateShipOwner, 
  setUpdateSiupal, 
  resetUpdateSiupal, 
} from '../store/actions/shipAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const ShipOwnerDetailPage = ({ dispatch, dataShip })  =>  {
  const navigate = useNavigate()
  const { shipOwnerId } = useParams();
  const [progress, setProgress] = useState(true);
  const [accountId, setAccountId] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isVerified, setIsVerified] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [pic, setPic] = useState("");
  const [picPhone, setPicPhone] = useState("");
  const [siupal, setSiupal] = useState("");

  useEffect(()=>{
    if( dataShip.oneShipOwnerResp ){
      const data = dataShip.oneShipOwnerResp.shipOwner
      setEmail(data.companyEmail)
      setAccountId(data.accountId)
      setCompanyName(data.companyName)
      setCompanyAddress(data.companyAddress)
      setCompanyEmail(data.companyEmail)
      setPic(data.picName)
      setPicPhone(data.picPhoneNumber)
      setSiupal(data.siupalNumber)
      setIsVerified(data.account)
      setIsActive(data.account.isActive)
    }
  },[dataShip.oneShipOwnerResp])

  useEffect(()=>{
    if( dataShip.updateShipResp ){
      resetUpdateShipOwner(dispatch)
      navigate('../shipOwner');
    }
  },[dataShip.updateShipResp])

  useEffect(()=>{
    if( dataShip.updateSiupal ){
      resetUpdateSiupal(dispatch)
    }
  },[dataShip.updateSiupal])

  useEffect(()=>{
    setOneShipOwner(dispatch, shipOwnerId)
  },[])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const updateShipOwner = (e) => {
    e.preventDefault()
    let data = {
      companyName: companyName,
      companyAddress: companyAddress,
      companyEmail: companyEmail,
      picName: pic,
      picPhoneNumber: picPhone,
      siupalNumber: siupal,
    }
    setUpdateShipOwner(dispatch, data, shipOwnerId)
  }

  const activeDeactive = (e) => {
    e.preventDefault()
    let data = {
      accountId,
      companyName,
      isActive: !isActive,
    }
    setActiveDeactive(dispatch, data)
  }

  const doInputSiupalNumber = () => {
    Swal.fire({
      title: 'Change SIUPAL Number',
      input: 'text',
      inputLabel: `Previous : ${siupal}`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      confirmButtonColor: '#163b55',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#a9acaf',
      showCloseButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please Input new SIUPAL Number'
        }else{
          let data = {
            siupalNumber: value
          }
          setUpdateSiupal(dispatch, data, shipOwnerId)
          return setSiupal(value)
        }
      }
    })
  }

  const dataForm = [
    {
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "12",
      notEditable: true,
      value: email,
      action: setEmail,
    },
    // {
    //   label: "Phone Number",
    //   type: "text",
    //   placeholder: "Input Phone Number",
    //   spaceMd: "6",
    //   spaceXs: "12",
    // },
    // {
    //   label: "Password",
    //   type: "password",
    //   placeholder: "Input Password",
    //   spaceMd: "6",
    //   spaceXs: "12",
    // },{
    //   label: "Confirm Password",
    //   type: "password",
    //   placeholder: "Input Confirm Password",
    //   spaceMd: "6",
    //   spaceXs: "12",
    // },
    {
      label: "Company Profile",
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
    },
    // {
    //   label: "Ship Owner ID",
    //   type: "text",
    //   notEditable: true,
    //   placeholder: "Input Ship Owner ID",
    //   spaceMd: "6",
    //   spaceXs: "12",
    // }
    ,{
      label: "Company Name *",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "12",
      value: companyName,
      action: setCompanyName,
      required: true,
    },{
      label: "Company Address *",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "6",
      spaceXs: "12",
      value: companyAddress,
      action: setCompanyAddress,
      required: true,
    },{
      label: "Company Email *",
      type: "text",
      placeholder: "Input Company Email",
      spaceMd: "6",
      spaceXs: "12",
      value: companyEmail,
      action: setCompanyEmail,
      required: true,
    },{
      label: "Person In Charge",
      type: "text",
      placeholder: "Input Person In Charge",
      spaceMd: "6",
      spaceXs: "12",
      value: pic,
      action: setPic,
      required: true,
    },{
      label: "PIC's Phone Number",
      type: "text",
      placeholder: "Input PIC's Phone Number",
      spaceMd: "6",
      spaceXs: "12",
      value: picPhone,
      action: setPicPhone,
      required: true,
    },{
      label: "SIUPAL Number",
      type: "text",
      placeholder: "Input SIUPAL Number",
      spaceMd: "6",
      spaceXs: "12",
      notEditable: true,
      value: siupal,
      action: setSiupal,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Change SIUPAL Number",
      type: "link",
      spaceMd: "6",
      spaceXs: "12",
      onClick: doInputSiupalNumber,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
    },{
      label: isActive === true ? "Deactivate" : "Activate",
      type: "button",
      spaceMd: "3",
      spaceXs: "3",
      action: activeDeactive,
    },
    {
      type: "SPACE",
      spaceMd: "3",
      spaceXs: "3",
    },
    // {
    //   label: "Change Password",
    //   type: "button_white",
    //   spaceMd: "3",
    //   spaceXs: "3",
    //   link: "../../changePassword"
    // },
    {
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../shipOwner"
    }
  ]

  return (    
    // isVerified && isActive && 
    isVerified &&  
    <div className="container_right_form">
      <MainForm
        pageName={"Ship Owner Details"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        pageFor={"detail"}
        isVerified={isVerified}
        email={email}
        onSubmit={updateShipOwner}
        isActive={isActive}
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
)(ShipOwnerDetailPage)