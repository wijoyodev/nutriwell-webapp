import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './MarineSupplierInfo.module.scss'
import FieldHandler from '../../MainForm/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  
  setAreaResp, 
  setSupplyCategoryData, 
  setCreateSupplier,
  resetCreateSupplierResp,
  setUpdateSupplier,
  resetUpdateSupplier,
} from '../../../store/actions/supplierAction'

const MarineSupplierInfo = ({
  pageFor,
  setPosition,
  dispatch, 
  dataSupplier,
  section,
  suppContId,
  marineSupplier,
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [supplierId, setSupplierId] = useState("");
  const [supplyArea, setSupplyArea] = useState([]);
  const [supplyCategory, setSupplyCategory] = useState([]);
  const [area, setArea] = useState([]);
  const [category, setCategory] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [suppliesDescription, setSuppliesDescription] = useState("---");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);

  const skipForm = (e) =>{
    e.preventDefault()
    setPosition("MarineContractorInfo")
  }

  const onClickFunc = () => {
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      doCreateSupplier(event)
    }
    setValidated(true);
  };

  
  const doCreateSupplier = (e) => {
    e.preventDefault()
    const data = {
      supplierContractorId: suppContId ? suppContId : localStorage.getItem('supplierContractorId'),
      companyName,
      description,
      suppliesDescription,
      address,
      contactName,
      whatsappNumber,
      websiteUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      imageUrls: images,
    }
    if( marineSupplier ){
      data.areaIds = setIds(area, "area")
      data.supplyCategoryIds = setIds(category, "category")
      data.islandIds = setIds(area, "island")
      setUpdateSupplier(dispatch, data, supplierId)
    }else{
      data.areaIds = setIds(supplyArea, "area")
      data.supplyCategoryIds = setIds(supplyCategory, "category")
      data.islandIds = setIds(supplyArea, "island")
      setCreateSupplier(dispatch, data)
    }
  }
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const setIds = (data, section) => {
    let resultIds = []
    let islandData = []
    for( let i=0 ; i<data.length ; i++ ){
      if( section === "island" && ( !islandData.includes(data[i].islandId) && data[i].checked === true )){
        islandData.push(data[i].islandId)
      } else if( data[i].checked === true ){
        resultIds.push(data[i].id)
      }
    }
    if( section === "island" ){
      return islandData
    }else{
      return resultIds
    }
  }

  const manageCheckList = (checkedData, section) => {
    let allData = []
    let islandData = []
    let mainData = ""

    if( section === "area" ){
      mainData = supplyArea
    }else if( section === "supply" ){
      mainData = supplyCategory
    }

    for( let i=0 ; i<mainData.length ; i++ ){
      let oneData = mainData[i]
      for( let j=0 ; j<checkedData.length ; j++ ){
        if( oneData.id === checkedData[j].id ){
          oneData["checked"] = true 
          break; 
        }
      }
      if(oneData["checked"] != true){
        oneData["checked"] = false
      }
      allData.push(oneData)
    }

    if( section === "area" ){
      setArea(allData)
    }else if( section === "supply" || section === "contractor" ){
      setCategory(allData)
    }
    console.log(".")
  }

  const manageCategory = (data, section) => {
    for( let i=0 ; i<data.length ; i++ ){
      data[i]["checked"] = false
    }
    if( section === "area" ){
      setSupplyArea(data)
    }else if( section === "supply" ){
      setSupplyCategory(data)
    }
  }

  const onChangeChecklist = (section, allData, index) => {
    let datas = [...allData]
    if( section === "area" ){
      datas[index].checked = !datas[index].checked
      setSupplyArea(datas)
    } else if( section === "supply" ){
      datas[index].checked = !datas[index].checked
      setSupplyCategory(datas)
    }
  }

  const dataForm = [
    {
      label: "Company Name *",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "6",
      action: setCompanyName,
      value: companyName,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Photo",
      desc: "You can add up to 10 photo",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "12",
      maxImage: "10",
      images: images,
      action: onChangeImage,
    },{
      label: "Description *",
      type: "textarea",
      placeholder: "Short description about your company",
      spaceMd: "12",
      spaceXs: "12",
      action: setDescription,
      value: description,
      required: true,
    },{
      label: "Supply Category *",
      type: "checklist",
      spaceMd: "12",
      spaceXs: "12",
      spaceMdChild: "6",
      section: "supply",
      datas: section === "update" ? (marineSupplier? category:supplyCategory) : supplyCategory,
      action: onChangeChecklist,
    },{
      label: "Supply Area *",
      type: "checklist",
      spaceMd: "12",
      spaceXs: "12",
      spaceMdChild: "6",
      section: "area",
      datas: section === "update" ? (marineSupplier? area:supplyArea) : supplyArea,
      action: onChangeChecklist,
    },{
      label: "Address *",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "12",
      spaceXs: "12",
      action: setAddress,
      value: address,
      required: true,
    },{
      label: "Contact Name",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "6",
      action: setContactName,
      value: contactName,
      required: true,
    },{
      label: "Whatsapp Number *",
      type: "text",
      placeholder: "e.g. +628571251212",
      spaceMd: "6",
      spaceXs: "6",
      action: setWhatsappNumber,
      value: whatsappNumber,
      required: true,
    },{
      label: "Company Website",
      type: "text",
      placeholder: "e.g. https://Website.com",
      spaceMd: "6",
      spaceXs: "6",
      action: setWebsiteUrl,
      value: websiteUrl,
    },{
      label: "Company Facebook",
      type: "text",
      placeholder: "e.g. https://Facebook.com",
      spaceMd: "6",
      spaceXs: "6",
      action: setFacebookUrl,
      value: facebookUrl,
      required: false,
    },{
      label: "Company Instagram",
      type: "text",
      placeholder: "e.g. https://Instagram.com",
      spaceMd: "6",
      spaceXs: "6",
      action: setInstagramUrl,
      value: instagramUrl,
      required: false,
    },{
      label: "Company LinkedIn",
      type: "text",
      placeholder: "e.g. https://LinkedIn.com",
      spaceMd: "6",
      spaceXs: "6",
      action: setLinkedinUrl,
      value: linkedinUrl,
      required: false,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Skip",
      type: "buttonWhite",
      spaceMd: "4",
      spaceXs: "4",
      onClickAction: skipForm,
    },{
      type: "SPACE",
      spaceMd: "4",
      spaceXs: "4",
    },{
      label: "Save & Next",
      type: "button_submit",
      spaceMd: "4",
      spaceXs: "4",
    }
  ] 

  const initImage = (allImages) => {
    let data = []
    for( let i=0 ;i<allImages.length ; i++){
      data.push({data_url: allImages[i].imageUrl})
    }
    setImages(data)
  }

  useEffect(()=>{
    if( section === "update" ){
      setSupplyCategoryData(dispatch)
      setAreaResp(dispatch)
      if( marineSupplier ){
        setCompanyName(marineSupplier.companyName)
        setImages(marineSupplier.images)
        setDescription(marineSupplier.description)
        setSuppliesDescription(marineSupplier.suppliesDescription)
        setAddress(marineSupplier.address)
        setContactName(marineSupplier.contactName)
        setWhatsappNumber(marineSupplier.whatsappNumber)
        setWebsiteUrl(marineSupplier.websiteUrl)
        setFacebookUrl(marineSupplier.facebookUrl)
        setInstagramUrl(marineSupplier.instagramUrl)
        setLinkedinUrl(marineSupplier.linkedinUrl)
        setSupplierId(marineSupplier.id)
        initImage(marineSupplier.supplierPhotos)
      }
    }else{
      setSupplyCategoryData(dispatch)
      setAreaResp(dispatch)
    }
  },[])

  useEffect(()=>{
    if( dataSupplier.createSuppResp ){
      resetCreateSupplierResp(dispatch)
      setPosition("MarineContractorInfo")
    }
    if( dataSupplier.updateSupplierResp ){
      resetUpdateSupplier(dispatch)
      setPosition("MarineContractorInfo")
    }
  },[dataSupplier.createSuppResp, dataSupplier.updateSupplierResp])

  useEffect(()=>{
    if( dataSupplier.supplyCategoryResp ){
      manageCategory(dataSupplier.supplyCategoryResp, "supply")
      if( section === "update" ){
        if( marineSupplier ){
          manageCheckList(marineSupplier.supplyCategories, "supply")
        }
      }
    }
  },[dataSupplier.supplyCategoryResp])

  useEffect(()=>{
    if( dataSupplier.areaResp ){
      manageCategory(dataSupplier.areaResp, "area")
      if( section === "update" ){
        if( marineSupplier ){
          manageCheckList(marineSupplier.areas, "area")
        }
      }
      setIsLoading(false)
    }
  },[dataSupplier.areaResp])

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
    }
	},[pageFor])

	return (
    isLoading === false && 
    <>
      {(category.length > 0 || supplyCategory.length > 0 ) && (area.length > 0 || supplyArea.length > 0 ) && <>
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
    dataSupplier: state.supplier,
  };
};

export default connect(
  storage
)(MarineSupplierInfo)

