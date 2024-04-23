import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setUploadFile, resetUploadFile, setDetailShipyard, resetDetailShipyard, setAllShipyardByShipyardId, setUpdateDetailShipyard } from '../store/actions/shipyardAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const AddMemberPage = ({ dispatch, dataShipyard }) => {
  const { disbursementId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [allShipyard, setAllShipyard] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [upline, setUpline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState("");
  const [dob, setDOB] = useState("");
  const navigate = useNavigate()
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
      email,
      status,
      gender,
      upline,
      phone,
    }
    setUpdateDetailShipyard(dispatch, dataUpdate, id)
  }

  useEffect(()=>{
    if( dataShipyard.detailShipyardResp ){
      let data = dataShipyard.detailShipyardResp
      setId(data.id)
      setName(data.name)
      setEmail(data.email)
      setStatus(data.status)
    }
  },[dataShipyard.detailShipyardResp])

  useEffect(()=>{
    if( dataShipyard.allShipyardByShipyardIdResp ){
      setAllShipyard(dataShipyard.allShipyardByShipyardIdResp)
      setIsLoading(false)
    }
  },[dataShipyard.allShipyardByShipyardIdResp])

  useEffect(()=>{
    setDetailShipyard(dispatch, disbursementId)
    setAllShipyardByShipyardId(dispatch, disbursementId)
  },[])

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
        allShipyard={allShipyard}
        status={status}
        pageFor={"detail"}
        isVerified={isVerified}
        email={email}
        onSubmit={doUpdate}
        whiteBackground={true}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataShipyard: state.shipyard,
  };
};

export default connect(
  storage
)(AddMemberPage)
