import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, } from 'react-bootstrap'
import styles from './Information.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { setUpdateMember } from '../../../store/actions/memberAction'

const Information = ({
  dataOneMember,
  dispatch
}) => {
  const { memberId } = useParams()
  const [progress, setProgress] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [upline, setUpline] = useState("");
  const [dob, setDOB] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankAccountName, setBankAccountName] = useState();
  const [phone, setPhone] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  
  const navigate = useNavigate()

  const onChangeImage = (imageList) => {
    setAvatarUrl(imageList);
  };

  const updateInfo = (e) =>{
    e.preventDefault()
    let dataMember
    if( avatarUrl.length === 0 ){
      Swal.fire({
        title: 'Photo',
        text: "Need to upload photo",
        icon: 'warning',
        confirmButtonColor: '#1b4460',
      })
    }else if( !avatarUrl[0].file ){
      dataMember = {
        full_name: name,
        email,
        phone_number: phone,
        date_of_birth: dob,
        account_bank: bankName,
        account_bank_name: bankAccountName,
        account_bank_number: bankAccount,
      }
    }else{
      dataMember = {
        avatar: avatarUrl,
        full_name: name,
        email,
        phone_number: phone,
        date_of_birth: dob,
        account_bank: bankName,
        account_bank_name: bankAccountName,
        account_bank_number: bankAccount,
      }
    }
    setUpdateMember(dispatch, memberId, dataMember)
  }

  const setData = (data) => {
    setId(data.id)
    setName(data.full_name)
    setEmail(data.email)
    setPhone(data.phone_number)
    setDOB(data.date_of_birth)
    setAddress(data.address_detail.address_detail + ', ' + data.address_detail.district + ', ' + data.address_detail.city + ', ' + data.address_detail.province)
    setGender(data.gender)
    // setUpline(data)
    setBankAccountName(data.account_bank_number)
    setBankName(data.account_bank_name)
    setBankAccount(data.account_bank)
    setReferrerCode(data.referral_code)
    setProgress(false)
    if( data.avatar_url ){
      setAvatarUrl([{"data_url": data.avatar_url}])
    }
  }

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
      images: avatarUrl,
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
      action: setName,
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
      value: bankAccountName,
      action: setBankAccountName,
      required: false,
    },{
      label: "Nama Bank",
      type: "text",
      placeholder: "input Nama Bank",
      spaceMd: "6",
      spaceXs: "6",
      value: bankName,
      action: setBankName,
      required: false,
    },{
      label: "Nomor Rekening",
      type: "text",
      placeholder: "input Nomor Rekening",
      spaceMd: "6",
      spaceXs: "6",
      value: bankAccount,
      action: setBankAccount,
      required: false,
    },{
      label: "Informasi Upline",
      type: "labelTitle",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Upline",
      type: "text",
      placeholder: "Upline",
      spaceMd: "6",
      spaceXs: "6",
      action: setUpline,
      value: upline,
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
      action: updateInfo,
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
    }
    setValidated(true);
  };
  
	return (
    progress === false &&
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
