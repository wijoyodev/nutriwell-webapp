import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './About.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainForm/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setIslandResp, setAddShipyard, resetAddShipyardResp, setUpdateShipyard, resetUpdateShipyard } from '../../../store/actions/shipyardAction'

const About = ({
  pageFor,
  dispatch, 
  dataShipyard,
  setPosition,
  dataOneShipyard,
}) => {
  const { orderId, memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  const [locations, setLocations] = useState(null)
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [contactName, setContactName] = useState("");
  const [selectedIsland, setSelectedIsland] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const navigate = useNavigate()

  const setLocation = () => {
    setIslandResp(dispatch)
  }
  
  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }
  
  const doRegisterUpdateShipyard = (e) => {
    e.preventDefault()
    let data = { 
      orderId,
      islandId: selectedIsland.id,
      areaId: selectedLocation.id,
      name,
      description,
      facilityDescription: '---',
      address,
      latitude,
      longitude,
      websiteUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      contactName,
      whatsappNumber,
      imageUrls: images,
    }
    if( pageFor === "detail" ){
      setUpdateShipyard(dispatch, data, memberId)
    }else{
      setAddShipyard(dispatch, data)
    }
  }
  
  const handleSelect = (e, type) => {
    const splitValue = e.target.value.split("||")
    if( type === "Island" ){
      setSelectedIsland({
        id: splitValue[0],
        name: splitValue[1],
      }) 
    } else if( type === "Location" ){
      setSelectedLocation({
        id: splitValue[0],
        name: splitValue[1],
      })
    }
  }

  const resetData = () => {
    
  }

  const manageLocation = () => {
    const list = dataShipyard.islandResp.data.islands
    let islands = []
    let location = {}

    for( let i=0 ; i<list.length ; i++ ){
      if( i === 0 ){
        setSelectedIsland({
          id: list[i].id,
          name: list[i].name,
        })
      }
      islands.push({
        id: list[i].id,
        name: list[i].name,
      })
      location[list[i].name] = []
      for( let j=0 ; j<list[i].areas.length ; j++ ){
        let area = list[i].areas[j]
        if( i === 0 && j === 0 ){
          setSelectedLocation({
            id: area.id,
            name: area.name,
          })
        }
        location[list[i].name].push({
          id: area.id,
          name: area.name,
        })
      }
    }
    setIslands(islands)
    setLocations(location)
    setIsLoading(false)
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
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const initImage = (allImages) => {
    let data = []
    for( let i=0 ;i<allImages.length ; i++){
      data.push({data_url: allImages[i].imageUrl})
    }
    setImages(data)
  }

  useEffect(()=>{
    if( dataShipyard.islandResp.data ){
      manageLocation()
    }
  },[dataShipyard.islandResp])

  useEffect(()=>{
    if( dataShipyard.addShipyardResp ){
      // navigate("../shipyardListed");
      resetAddShipyardResp(dispatch)
      setPosition("Dock Facility")
      localStorage.setItem("pagePos","Dock Facility")
    }
  },[dataShipyard.addShipyardResp])

  useEffect(()=>{
    if( dataShipyard.updateShipyardResp ){
      resetUpdateShipyard(dispatch)
      setPosition("Dock Facility")
      localStorage.setItem("pagePos","Dock Facility")
    }
  },[dataShipyard.updateShipyardResp])

  const setData = (data) => {
    setName(data.name)
    setSelectedIsland(data.island)
    setSelectedLocation(data.area)
    setDescription(data.description)
    setAddress(data.address)
    setLatitude(data.latitude)
    setLongitude(data.longitude)
    setContactName(data.contactName)
    setWhatsappNumber(data.whatsappNumber)
    setWebsiteUrl(data.websiteUrl)
    setFacebookUrl(data.facebookUrl)
    setInstagramUrl(data.instagramUrl)
    setLinkedinUrl(data.linkedinUrl)
    initImage(data.shipyardPhotos)
  }

  useEffect(()=>{
    setLocation()
    if( pageFor === "detail" ){
      setData(dataOneShipyard)
    }
  },[])

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  useEffect(()=>{
    setLocation()
    if( dataOneShipyard !== "not available" ){
      setData(dataOneShipyard)
    }
  },[dataOneShipyard])
  
  const dataForm = [
    {
      label: "Information",
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Profile Image",
      type: "uploadPhoto",
      spaceMd: "12",
      spaceXs: "12",
      maxImage: "1",
      images: images,
      action: onChangeImage,
      required: true,
    },{
      label: "ID",
      type: "text",
      placeholder: "Input ID",
      spaceMd: "6",
      spaceXs: "6",
      value: memberId,
      notEditable: true,
      required: true,
    },{
      label: "Nama",
      type: "text",
      placeholder: "Input Nama",
      spaceMd: "6",
      spaceXs: "6",
      action: setName,
      value: name,
      required: true,
    },{
      label: "Description *",
      type: "textarea",
      placeholder: "About your shipyard",
      spaceMd: "6",
      spaceXs: "6",
      action: setDescription,
      value: description,
      required: true,
    },{
      label: "Island *",
      type: "dropdown",
      default: "Select Island",
      spaceMd: "6",
      spaceXs: "6",
      section: "Island",
      dataDropdown: islands,
      value: selectedIsland,
      action: handleSelect,
    },{
      label: "Location *",
      type: "dropdownChild",
      dataDropdown: locations,
      value: selectedLocation,
      default: "Select Location",
      spaceMd: "6",
      spaceXs: "6",
      action: handleSelect,
      selectedIsland: selectedIsland,
      section: "Location",
    },{
      label: "Address *",
      type: "text",
      placeholder: "Shipyard Address",
      spaceMd: "6",
      spaceXs: "6",
      value: address,
      action: setAddress,
      required: true,
    },{
      label: "Latitude *",
      type: "text",
      placeholder: "e.g 7.6345",
      spaceMd: "6",
      spaceXs: "6",
      value: latitude,
      action: setLatitude,
      required: true,
    },{
      label: "Longitude *",
      type: "text",
      placeholder: "e.g 7.6345",
      spaceMd: "6",
      spaceXs: "6",
      value: longitude,
      action: setLongitude,
      required: true,
    },{
      label: "Contact Name *",
      type: "text",
      placeholder: "Input Contact Name",
      spaceMd: "6",
      spaceXs: "6",
      value: contactName,
      action: setContactName,
      required: true,
    },{
      label: "Whatsapp Number *",
      type: "text",
      placeholder: "e.g +62836730485",
      spaceMd: "6",
      spaceXs: "6",
      value: whatsappNumber,
      action: setWhatsappNumber,
      required: true,
    },{
      label: "Shipyard Website",
      type: "text",
      placeholder: "e.g. https://website.com/",
      spaceMd: "6",
      spaceXs: "6",
      value: websiteUrl,
      action: setWebsiteUrl,
    },{
      label: "Shipyard Facebook",
      type: "text",
      placeholder: "e.g. https://Facebook.com/",
      spaceMd: "6",
      spaceXs: "6",
      value: facebookUrl,
      action: setFacebookUrl,
      required: false,
    },{
      label: "Shipyard Instagram",
      type: "text",
      placeholder: "e.g. https://Instagram.com/",
      spaceMd: "6",
      spaceXs: "6",
      value: instagramUrl,
      action: setInstagramUrl,
      required: false,
    },{
      label: "Shipyard LinkedIn",
      type: "text",
      placeholder: "e.g. https://LinkedIn.com/",
      spaceMd: "6",
      spaceXs: "6",
      value: linkedinUrl,
      action: setLinkedinUrl,
      required: false,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      action: backPage,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: pageFor === "detail" ? "Save & Next" : "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
    },{
      label: "Deactive",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
      onClickAction: doDeactive,
    }
  ]
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      doRegisterUpdateShipyard(event)
    }
    setValidated(true);
  };

  // useEffect(()=>{
  //   if( pageFor === "detail" ){
  //     let data = [...dataForm]
  //     data.push({
  //       label: "Deactive",
  //       type: "buttonWhite",
  //       spaceMd: "3",
  //       spaceXs: "3",
  //       onClickAction: doDeactive,
  //     })
  //     data.push({
  //       label: "Cancel",
  //       type: "buttonWhite",
  //       spaceMd: "3",
  //       spaceXs: "3",
  //     })
  //     setDataForm(data)
  //   }
	// },[pageFor])
  // 
	return (
    isLoading ==false &&
    <>
      { islands !== null && locations !== null &&  <>
        <Container className={styles.container}>
          <Row>
            <Col className={styles.container_about} xs={6}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className={styles.field_container}>
                  {dataForm.map( (item, index)=>{
                      return <FieldHandler item={item} index={index} key={index}/>
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
    dataShipyard: state.shipyard
  };
};

export default connect(
  storage
)(About)
