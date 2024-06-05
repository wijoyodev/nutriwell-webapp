import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setCreateAdmin } from '../store/actions/adminAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const AddAdminPage = ({ dispatch, dataAdmin }) => {
  const { disbursementId } = useParams()
	const [showPassword, setShowPassword] = useState(false);

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [allShipyard, setAllShipyard] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");
  const navigate = useNavigate()

  const doCreateAdmin = (e) => {
    console.log("masuk do create admiubn")
    e.preventDefault()
    const dataCreate = {
      name,
      email,
      role,
      password,
    }
    setCreateAdmin(dispatch, dataCreate)
  }

  useEffect(()=>{
    if( dataAdmin.createAdminResp ){
      console.log(dataAdmin.createAdminResp, "<<< dataAdmin.createAdminResp")
      let data = dataAdmin.createAdminResp
      setId(data.id)
      setName(data.name)
      setEmail(data.email)
      setIsLoading(false)
    }
  },[dataAdmin.createAdminResp])

  useEffect(()=>{
    if( dataAdmin.allShipyardByShipyardIdResp ){
      setAllShipyard(dataAdmin.allShipyardByShipyardIdResp)
      setIsLoading(false)
    }
  },[dataAdmin.allShipyardByShipyardIdResp])

  useEffect(()=>{
  },[])

  const dataForm = [
    {
      label: "Nama",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "4",
      spaceXs: "12",
      required: true,
      value: name,
      action: setName,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "4",
      spaceXs: "12",
      required: true,
      value: email,
      action: setEmail,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Password",
      type: "password",
      placeholder: "Input Password",
      spaceMd: "4",
      spaceXs: "12",
      required: true,
      value: password,
      showPassword: false,
      action: setPassword,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Simpan",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      action: doCreateAdmin,
    },{
      label: "Batal",
      type: "buttonWhite",
      spaceMd: "3",
      link: '../adminManagement',
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
        pageFor={"detail"}
        isVerified={isVerified}
        email={email}
        onSubmit={doCreateAdmin}
        whiteBackground={true}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataAdmin: state.admin,
  };
};

export default connect(
  storage
)(AddAdminPage)
