import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setActiveDeactive } from '../store/actions/loginRegisterAction'
import { setAdminById, setUpdateDetaiAdmin } from '../store/actions/adminAction'

const AdminDetailPage = ({ dispatch, dataAdmin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { adminId } = useParams()
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState("");
  const [accountId, setAccountId] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const navigate = useNavigate()

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
    }
    setUpdateDetaiAdmin(dispatch, dataUpdate, adminId)
  }

  const activeDeactive = (e) => {
    e.preventDefault()
    let data = {
      accountId: accountId,
      companyName: name,
      isActive: !isActive,
    }
    setActiveDeactive(dispatch, data)
  }

  useEffect(()=>{
    if( dataAdmin.adminDetailResp ){
      let data = dataAdmin.adminDetailResp
      setName(data.name)
      setEmail(data.account.email)
      setIsVerified(data.account)
      setIsLoading(false)
      setIsActive(data.account.isActive)
      setAccountId(data.accountId)
    }
  },[dataAdmin.adminDetailResp])

  useEffect(()=>{
    setAdminById(dispatch, adminId)
  },[])

  const dataForm = [
    {
      label: "Admin ID",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "6",
      notEditable: true,
      value: adminId,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Name",
      type: "text",
      placeholder: "Input Name",
      spaceMd: "6",
      spaceXs: "12",
      value: name,
      action: setName,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Email",
      type: "text",
      placeholder: "Input Email",
      spaceMd: "6",
      spaceXs: "12",
      notEditable: true,
      value: email,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Cancel",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../adminManagement"
    },{
      label: isActive ? "Deactivate" : "Activate",
      type: "button",
      spaceMd: "3",
      spaceXs: "3",
      action: activeDeactive,
    },{
      type: "SPACE",
      spaceMd: "3",
      spaceXs: "3",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      link: "../accountReview"
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  return (    
    isLoading === false && isVerified &&
    <div className="container_right_form">
      <MainForm
        pageName={"Admin Detail"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        adminId={adminId}
        pageFor={"detail"}
        isVerified={isVerified}
        email={email}
        isActive={isActive}
        onSubmit={doUpdate}
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
)(AdminDetailPage)
