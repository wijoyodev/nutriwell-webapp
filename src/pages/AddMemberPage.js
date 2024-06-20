import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { setCreateMember } from '../store/actions/memberAction'

const AddMemberPage = ({ dispatch, dataMember }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [phoneNumberCountry, setPhoneNumberCountry] = useState("ID");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dob, setDOB] = useState("");
  const navigate = useNavigate()
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setAvatar(imageList);
  };

  const createMember = (e) => {
    e.preventDefault()
    if( !avatar ){
      Swal.fire({
        title: 'Error',
        text: 'Please set profile image',
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    }else if( password.length !== 6 || !(/^\d+$/.test(password)) ){
      Swal.fire({
        title: 'Error',
        text: 'Password should be exactly 6 digit number long',
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    }else if( password !== confirmPassword ){
      Swal.fire({
        title: 'Error',
        text: 'Password & Confirmation not equal',
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    }else{
      const dataMember = {
        avatar,
        email,
        status,
        gender,
        full_name: name,
        phone_number_country: phoneNumberCountry,
        phone_number: phone,
        date_of_birth: dob,
        referrer_code: code,
        password,
        confirm_password: confirmPassword,
      }
      console.log(dataMember, "<DATA MEMBER")
      setCreateMember(dispatch, dataMember)
    }
  }
  
  const handleSelect = (e, type) => {
    console.log("masuk handleSelect", e)
    const splitValue = e.target.value.split("||")
    setGender(splitValue[1]) 
  }

  const dataForm = [
    {
      label: "Profile Image",
      type: "uploadPhoto",
      spaceMd: "12",
      spaceXs: "12",
      maxImage: "1",
      images: avatar,
      action: onChangeImage,
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
      label: "Nama",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "6",
      spaceXs: "6",
      value: name,
      action: setName,
      required: true,
    },{
      label: "Password",
      type: "password",
      placeholder: "Input Password",
      spaceMd: "6",
      spaceXs: "6",
      value: password,
      action: setPassword,
      required: true,
    },{
      label: "Confirm Password",
      type: "password",
      placeholder: "Input Confirm Password",
      spaceMd: "6",
      spaceXs: "6",
      value: confirmPassword,
      action: setConfirmPassword,
      required: true,
    },{
      label: "No Telepon",
      type: "text",
      placeholder: "Input No Telepon",
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
      type: "dropdown",
      placeholder: "Pilih jenis kelamin",
      spaceMd: "6",
      spaceXs: "6",
      value: gender,
      action: handleSelect,
      required: true,
      dataDropdown:[{id: 1, name:"male"},{id: 2, name:"female"}]
    },{
      label: "Referrer Code (only valid code)",
      type: "text",
      placeholder: "Input Referrer Code",
      spaceMd: "6",
      spaceXs: "6",
      value: code,
      action: setCode,
      required: false,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Simpan",
      type: "button_submit",
      spaceMd: "3",
      action: createMember,
      spaceXs: "3",
    },{
      label: "Batal",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
    }
  ]

  useEffect(()=>{
    if( dataMember.createMemberResp ){
      console.log(dataMember.createMemberResp, "<<< dataMember.createMemberResp")
      Swal.fire({
        title: 'Success',
        text: "Register Success",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
    }
  },[dataMember.createMemberResp])

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Tambah Member"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        status={status}
        pageFor={"detail"}
        isVerified={isVerified}
        email={email}
        onSubmit={createMember}
        whiteBackground={true}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataMember: state.member,
  };
};

export default connect(
  storage
)(AddMemberPage)
