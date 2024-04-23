import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setUploadFile, resetUploadFile, setDetailShipyard, resetDetailShipyard, setAllShipyardByShipyardId, setUpdateDetailShipyard } from '../store/actions/shipyardAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const AddAdminPage = ({ dispatch, dataShipyard }) => {
  const { disbursementId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [allShipyard, setAllShipyard] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
      email,
      status,
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
      label: "Nama",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "4",
      spaceXs: "12",
      required: true,
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
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Password",
      type: "text",
      placeholder: "Input Password",
      spaceMd: "4",
      spaceXs: "12",
      required: true,
    },{
      type: "SPACE",
      spaceMd: "8",
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
)(AddAdminPage)
