import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './Information.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setIslandResp, setAddShipyard, resetAddShipyardResp, setUpdateShipyard, resetUpdateShipyard } from '../../../store/actions/shipyardAction'

const Information = ({
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
  const [id, setId] = useState("");
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bankName, setBankName] = useState("");
  const [upline, setUpline] = useState("");
  const [dob, setDOB] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [bankAccountName, setBankAccountName] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [referalCode, setReferalCode] = useState("");
  
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
      // islandId: selectedIsland.id,
      areaId: selectedLocation.id,
      name,
      facilityDescription: '---',
      address,
      bankName,
      upline,
      bankAccount,
      linkedinUrl,
      phone,
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
      setBankAccountName({
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
        setBankAccountName({
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
    setId("MEI02")
    setName("Chelsea Hillman")
    setEmail("chelsea@gmail.com")
    setPhone("0857634363")
    setDOB("1711555351")
    setAddress("Jalan Sudirman no 25, Jakarta Selatan")
    setGender("male")
    setUpline("Soekamti C")
    setReferalCode("Soekamti C")
    setBankAccountName("Chelsea")
    setBankName("BCA")
    setBankAccount("Barklay")
  }

  useEffect(()=>{
    setLocation()

    // testing purpose only
      setData(dataOneShipyard)
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
      type: "labelTitle",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Profile Image",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "6",
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
      value: id,
      notEditable: true,
      required: true,
    },{
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "6",
      value: email,
      action: setEmail,
      required: true,
    },{
      label: "Nomor Telepon",
      type: "text",
      placeholder: "Input Nomor Telepon",
      spaceMd: "6",
      spaceXs: "6",
      value: phone,
      action: setPhone,
      required: true,
    },{
      label: "Tanggal Lahir",
      type: "date",
      placeholder: "Input tanggal lahir",
      spaceMd: "6",
      spaceXs: "6",
      availability:true,
      value: dob,
      action: setDOB,
      required: true,
    },{
      label: "Jenis Kelamin",
      type: "dropwdown",
      placeholder: "Pilih jenis kelamin",
      spaceMd: "6",
      spaceXs: "6",
      value: gender,
      action: setGender,
      required: true,
      dataDropdown:[{id: 1, name:"Laki-Laki"},{id: 2, name:"Perempuan"}]
    },{
      label: "Upline",
      type: "dropdown",
      placeholder: "Pilih Upline",
      spaceMd: "6",
      spaceXs: "6",
      value: upline,
      action: setUpline,
      dataDropdown:[{id: 1, name:"Shawn Mendes - 123"},{id: 2, name:"Roy Martin - 22222"}]
    },{
      label: "Kode Referral",
      type: "text",
      placeholder: "Input Kode Referral",
      spaceMd: "6",
      spaceXs: "6",
      value: referalCode,
      action: setReferalCode,
      required: false,
    },{
      label: "Alamat Pengiriman",
      type: "labelTitle",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Alamat",
      type: "text",
      placeholder: "input alamat",
      spaceMd: "6",
      spaceXs: "6",
      value: setAddress,
      action: address,
      required: false,
    },{
      label: "Akun Bank",
      type: "labelTitle",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Nama Rekening",
      type: "text",
      placeholder: "input Nama Rekening",
      spaceMd: "6",
      spaceXs: "6",
      value: setBankAccountName,
      action: bankAccountName,
      required: false,
    },{
      label: "Nama Bank",
      type: "text",
      placeholder: "input Nama Bank",
      spaceMd: "6",
      spaceXs: "6",
      value: setBankName,
      action: bankName,
      required: false,
    },{
      label: "Nomor Rekening",
      type: "text",
      placeholder: "input Nomor Rekening",
      spaceMd: "6",
      spaceXs: "6",
      value: setBankAccount,
      action: bankAccount,
      required: false,
    },{
      label: "Informasi Upline",
      type: "labelTitle",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Upline",
      type: "text",
      placeholder: "input Upline",
      spaceMd: "6",
      spaceXs: "6",
      value: setUpline,
      action: upline,
      required: false,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
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
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      action: backPage,
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
            <Col className={styles.container_about} xs={12}>
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
)(Information)
