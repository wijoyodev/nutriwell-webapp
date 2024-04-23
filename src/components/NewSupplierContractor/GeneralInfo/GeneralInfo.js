import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './GeneralInfo.module.scss'
import FieldHandler from '../../MainForm/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { setRegisterResp, resetError, resetRegisterResp } from '../../../store/actions/loginRegisterAction'
import { setCreateSuppCont, resetCreateSuppContResp, setUpdateSupplierContractor, resetUpdateSupplierContractor } from '../../../store/actions/supplierAction'
import { setUploadFile, resetUploadFile } from '../../../store/actions/shipyardAction'

const GeneralInfo = ({
  pageFor,
  dispatch, 
  dataShipyard,
  dataSupplier,
  setPosition,
  section,
  dataSupCont,
  suppContId,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [picName, setPicName] = useState("");
  const [picPhoneNumber, setPicPhoneNumber] = useState("");
  const [articlesOfIncorperationUrl, setArticlesOfIncorperationUrl] = useState("");
  const [taxpayerIDNumberUrl, setTaxpayerIDNumberUrl] = useState("");
  const [businessIDNumberUrl, setBusinessIDNumberUrl] = useState("");
  const [decreeOfKemenkumhamUrl, setDecreeOfKemenkumhamUrl] = useState("");
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);

  const doCreateSuppCont = (e) => {
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
    if( section === "update" ){
      setUpdateSupplierContractor(dispatch, suppContId, dataRegister)
    }else{
      setCreateSuppCont(dispatch, dataRegister)
    }  
  }

  const triggerUpload = (e, section) => {
    setUploadFile(dispatch, e.target.files[0], section)
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      doCreateSuppCont(event)
    }
    setValidated(true);
  };

  useEffect(()=>{
    if( dataSupplier.createSuppContResp ){
      resetCreateSuppContResp(dispatch)
      Swal.fire({
        title: 'Success',
        text: "General Info Saved",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
      setPosition("MarineSupplierInfo")
    }else if( dataSupplier.updateSuppContResp ){
      resetUpdateSupplierContractor(dispatch)
      Swal.fire({
        title: 'Success',
        text: "General Info Saved",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
      setPosition("MarineSupplierInfo")
    }
  },[dataSupplier.createSuppContResp, dataSupplier.updateSuppContResp])

  useEffect(()=>{
    if( section === "update" ){
      setCompanyName(dataSupCont.companyName)
      setEmail(dataSupCont.account.email)
      setCompanyAddress(dataSupCont.companyAddress)
      setCompanyPhoneNumber(dataSupCont.companyPhoneNumber)
      setPicName(dataSupCont.picName)
      setPicPhoneNumber(dataSupCont.picPhoneNumber)
      setArticlesOfIncorperationUrl(dataSupCont.articlesOfIncorperationUrl)
      setTaxpayerIDNumberUrl(dataSupCont.taxpayerIDNumberUrl)
      setBusinessIDNumberUrl(dataSupCont.businessIDNumberUrl)
      setDecreeOfKemenkumhamUrl(dataSupCont.decreeOfKemenkumhamUrl)
    }
  },[dataSupCont])

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
      action: setCompanyName,
      value: companyName,
      required: true,
    },{
      label: "Company Email",
      type: "text",
      placeholder: "Input Company Email",
      spaceMd: "6",
      spaceXs: "12",
      notEditable: section === "update" ? true : false,
      action: setEmail,
      value: email,
      required: true,
    },{
      label: "Company Address",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "6",
      spaceXs: "12",
      action: setCompanyAddress,
      value: companyAddress,
      required: true,
    },{
      label: "Company Phone Number",
      type: "text",
      placeholder: "e.g. +625847515212",
      spaceMd: "6",
      spaceXs: "12",
      action: setCompanyPhoneNumber,
      value: companyPhoneNumber,
      required: true,
    },{
      label: "Akte Pendirian",
      type: "uploadDocument",
      id: "altePendirian",
      placeholder: "Upload Document",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "articlesOfIncorperationUrl",   
      action: triggerUpload,
      value: businessIDNumberUrl,
      for: section,
    },{
      label: "NPWP",
      type: "uploadDocument",
      id: "npwp",
      placeholder: "npwp",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "taxpayerIDNumberUrl",  
      action: triggerUpload,
      value: taxpayerIDNumberUrl,
      for: section,
    },{
      label: "NIB",
      type: "uploadDocument",
      id: "nib",
      placeholder: "nib",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "businessIDNumberUrl",  
      action: triggerUpload,
      value: articlesOfIncorperationUrl,
      for: section,
    },{
      label: "SK Kemenkumham",
      type: "uploadDocument",
      id: "skKemenkumham",
      placeholder: "Upload Document",
      mandatory: false,
      spaceMd: "6",
      spaceXs: "12",
      section: "decreeOfKemenkumhamUrl",   
      action: triggerUpload,
      value: decreeOfKemenkumhamUrl,
      for: section,
    },{
      label: "Person In Charge",
      type: "text",
      placeholder: "Input PIC's Name",
      spaceMd: "6",
      spaceXs: "12",
      action: setPicName,
      value: picName,
      required: true,
    },{
      label: "Phone Number",
      type: "text",
      placeholder: "e.g. +62578421584",
      spaceMd: "6",
      spaceXs: "12",
      action: setPicPhoneNumber,
      value: picPhoneNumber,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../supplierContractor"
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Save & Next",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
    }
  ]

  const onClickFunc = () => {
  }

  const doDeactive = (e) => {
    e.preventDefault()
    Swal.fire({
      text: "Are you sure want to deactivate this user?",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#a9acaf',
      cancelButtonText: 'No',
      cancelButtonColor: '#163b55',
      showCloseButton: true,
      showCancelButton: true,
    })
  }

  useEffect(()=>{
    if( pageFor === "detail" ){
      let data = [...dataForm]
      data.push({
        label: "Deactive",
        type: "buttonWhite",
        spaceMd: "3",
        spaceXs: "3",
        onClickAction: doDeactive,
      })
      data.push({
        label: "Cancel",
        type: "buttonWhite",
        spaceMd: "3",
        spaceXs: "3",
      })
      // setDataForm(data)
    } else if( pageFor === "add" ) {
      let data = [...dataForm]
      data.push({
        label: "Cancel",
        type: "buttonWhite",
        spaceMd: "3",
        spaceXs: "3",
      })
      // setDataForm(data)
    }
	},[pageFor])

	return (
    <>
      {dataForm.length > 0 && <>
        <Container className={styles.container}>
          <Row>
            <Col className={styles.container_about} xs={12}>
              <Form noValidate validated={validated}  onSubmit={handleSubmit}>
                <Row className={styles.field_container}>
                  {dataForm.map( (item, index)=>{
                      return <FieldHandler item={item} index={index} key={index} onClickFunc={onClickFunc}/>
                  })}
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </> }
    </>
	);
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister,
    dataShipyard: state.shipyard,
    dataSupplier: state.supplier,
  };
};

export default connect(
  storage
)(GeneralInfo)