import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './Information.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";

const Information = ({
  dataOneMember,
}) => {
  const { orderId, memberId } = useParams()
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  // const [locations, setLocations] = useState(null)
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bankName, setBankName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [upline, setUpline] = useState("");
  const [dob, setDOB] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [bankAccountName, setBankAccountName] = useState();
  // // const [selectedLocation, setSelectedLocation] = useState();
  const [referrerCode, setReferrerCode] = useState("");
  
  const navigate = useNavigate()

  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const setData = (data) => {
    console.log("SETDATA ", data)
    setId(data.id)
    setName(data.full_name)
    setEmail(data.email)
    setPhone(data.phone_number)
    setDOB(data.date_of_birth)
    setAddress(data.address_detail.address_detail + ', ' + data.address_detail.district + ', ' + data.address_detail.city + ', ' + data.address_detail.province)
    setGender(data.gender)
    // setUpline(data)
    setAvatarUrl(data.avatar_url)
    setBankAccountName(data.account_bank_number)
    setBankName(data.account_bank_name)
    setBankAccount(data.account_bank)
    setReferrerCode(data.referral_code)
  }

  useEffect(()=>{
  },[])

  useEffect(()=>{
    if(dataOneMember){
      setData(dataOneMember)
    }
  },[dataOneMember])

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  
  const dataForm = [
    {
      label: "Information",
      type: "labelTitle",
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
      value: id,
      notEditable: true,
      required: true,
    },{
      label: "Nama",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "6",
      spaceXs: "6",
      value: name,
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
    //   label: "Upline",
    //   type: "dropdown",
    //   placeholder: "Pilih Upline",
    //   spaceMd: "6",
    //   spaceXs: "6",
    //   value: upline,
    //   action: setUpline,
    //   dataDropdown:[{id: 1, name:"Shawn Mendes - 123"},{id: 2, name:"Roy Martin - 22222"}]
    // },{
      label: "Kode Referral",
      type: "text",
      placeholder: "Input Kode Referral",
      spaceMd: "6",
      spaceXs: "6",
      value: referrerCode,
      action: setReferrerCode,
      required: false,
      notEditable: true,
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
      value: address,
      action: setAddress,
      required: false,
      notEditable: true,
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
      action: upline,
      required: false,
      notEditable: true,
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
  
  console.log("masuk information")
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
    <>
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
    </>
	);
};

const storage = state => {
  return {
    dataMember: state.member
  };
};

export default connect(
  storage
)(Information)
