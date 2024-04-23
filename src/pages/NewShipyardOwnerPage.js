import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { setRegisterResp, resetError, resetRegisterResp } from '../store/actions/loginRegisterAction'
import { setUploadFile, resetUploadFile } from '../store/actions/shipyardAction'

const NewShipyardOwnerPage = ({ dispatch, dataLoginRegister, dataShipyard }) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [articlesOfIncorperationUrl, setArticlesOfIncorperationUrl] = useState("");
  const [taxpayerIDNumberUrl, setTaxpayerIDNumberUrl] = useState("");
  const [businessIDNumberUrl, setBusinessIDNumberUrl] = useState("");
  const [decreeOfKemenkumhamUrl, setDecreeOfKemenkumhamUrl] = useState("");
  const [picName, setPicName] = useState("");
  const [picPhoneNumber, setPicPhoneNumber] = useState("");
  const navigate = useNavigate()

  const doRegister = (e) => {
    e.preventDefault()
    const dataRegister = {
      companyName,
      email,
      companyAddress,
      companyPhoneNumber,
      picName,
      picPhoneNumber,
      ArticlesOfIncorperationUrl: articlesOfIncorperationUrl,
      TaxpayerIDNumberUrl: taxpayerIDNumberUrl,
      BusinessIDNumberUrl: businessIDNumberUrl,
      DecreeOfKemenkumhamUrl: decreeOfKemenkumhamUrl,
    }
    setRegisterResp(dispatch, dataRegister)
  }

  const triggerUpload = (e, section) => {
    setUploadFile(dispatch, e.target.files[0], section)
  }

  useEffect(()=>{
    if( dataLoginRegister.registerResp.data ){
      resetRegisterResp(dispatch)
      navigate("../shipyardOwner")
    }
  },[dataLoginRegister.registerResp])

  useEffect(()=>{
    if( dataShipyard.uploadFileResp ){
      switch (dataShipyard.uploadFileResp.section) {
        case "articlesOfIncorperationUrl" :
          setArticlesOfIncorperationUrl(dataShipyard.uploadFileResp.url)
          break;
        case "taxpayerIDNumberUrl" :
          setTaxpayerIDNumberUrl(dataShipyard.uploadFileResp.url)
          break;
        case "businessIDNumberUrl" :
          setBusinessIDNumberUrl(dataShipyard.uploadFileResp.url)
          break;
        case "decreeOfKemenkumhamUrl" :
          setDecreeOfKemenkumhamUrl(dataShipyard.uploadFileResp.url)
          break;
        default :
          setArticlesOfIncorperationUrl(dataShipyard.uploadFileResp.url)
          break;
      } 
      resetUploadFile(dispatch)
    }
  },[dataShipyard.uploadFileResp])

  const dataForm = [
    {
      label: "Company Name",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setCompanyName,
    },{
      label: "Company Email",
      type: "text",
      placeholder: "Input Company Email",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setEmail,
    },{
      label: "Company Address",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setCompanyAddress,
    },{
      label: "Company Phone Number",
      type: "text",
      placeholder: "e.g. +625847515212",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setCompanyPhoneNumber,
    },{
      label: "Akte Pendirian",
      type: "uploadDocument",
      placeholder: "Upload Document",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "articlesOfIncorperationUrl",
      required: true,
      action: triggerUpload,
    },{
      label: "NPWP",
      type: "uploadDocument",
      placeholder: "npwp",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "taxpayerIDNumberUrl",
      required: true,
      action: triggerUpload,
    },{
      label: "NIB",
      type: "uploadDocument",
      placeholder: "nib",
      mandatory: true,
      spaceMd: "6",
      spaceXs: "12",
      section: "businessIDNumberUrl",
      required: true,
      action: triggerUpload,
    },{
      label: "SK Kemenkumham",
      type: "uploadDocument",
      placeholder: "Upload Document",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "decreeOfKemenkumhamUrl",
      required: true,
      action: triggerUpload,
    },{
      label: "Person In Charge",
      type: "text",
      placeholder: "Input PIC's Name",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setPicName,
    },{
      label: "Phone Number",
      type: "text",
      placeholder: "e.g. +6255546515",
      spaceMd: "6",
      spaceXs: "12",
      required: true,
      action: setPicPhoneNumber,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../shipyardOwner"
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
        pageName={"New Shipyard Owner"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        onSubmit={doRegister}
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
)(NewShipyardOwnerPage)
