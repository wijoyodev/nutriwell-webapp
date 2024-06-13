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
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [phoneNumberCountry, setPhoneNumberCountry] = useState("ID");
  const [phone, setPhone] = useState("ID");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState("");
  const [dob, setDOB] = useState("");
  const navigate = useNavigate()
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const createMember = (e) => {
    e.preventDefault()
    if( password !== confirmPassword ){
      Swal.fire({
        title: 'Error',
        text: "Password & Confirmation not equal",
        icon: 'error',
        confirmButtonColor: '#1b4460',
      })
    }else{
      const dataMember = {
        email,
        name,
        phone,
        phoneNumberCountry,
        gender,
        dob,
        code,
        password,
        status,
      }
      setCreateMember(dispatch, dataMember)
    }
  }

  const dataForm = [
    {
      label: "Profile Image",
      type: "uploadPhoto",
      spaceMd: "12",
      spaceXs: "12",
      maxImage: "1",
      images: images,
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
      type: "text",
      placeholder: "Input Confirm Password",
      spaceMd: "6",
      spaceXs: "6",
      value: confirmPassword,
      action: setConfirmPassword,
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
      action: setGender,
      required: true,
      dataDropdown:[{id: 1, name:"Male"},{id: 2, name:"Female"}]
    },{
      label: "Referrer Code",
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
      spaceXs: "3",
    },{
      label: "Batal",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
    }
  ]

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Tambah Admin"}
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
