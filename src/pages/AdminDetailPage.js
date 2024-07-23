import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { setAdminById, setUpdateDetaiAdmin } from '../store/actions/adminAction'

const AdminDetailPage = ({ dispatch, dataAdmin }) => {
  const { adminId } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [detailAdmin, setDetailAdmin] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      id,
      full_name: name,
      email,
      status,
    }
    setUpdateDetaiAdmin(dispatch, dataUpdate, id)
  }
  
  const handleSelect = (e, type) => {
    const splitValue = e.target.value.split("||")
    setStatus(splitValue[0]) 
  }

  useEffect(()=>{
    if( dataAdmin.adminDetailResp ){
      setDetailAdmin(dataAdmin.adminDetailResp[0])
      setId(dataAdmin.adminDetailResp[0].id)
      setName(dataAdmin.adminDetailResp[0].full_name)
      setEmail(dataAdmin.adminDetailResp[0].email)
      setStatus(dataAdmin.adminDetailResp[0].status)
      setIsLoading(false)
    }
  },[dataAdmin.adminDetailResp])

  useEffect(()=>{
    setAdminById(dispatch, adminId)
  },[dispatch, adminId])

  const dataForm = [
    {
      label: "ID",
      type: "text",
      notEditable: true,
      placeholder: "Input Id",
      spaceMd: "4",
      spaceXs: "12",
      value: id,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Nama",
      type: "text",
      placeholder: "Input your Name",
      spaceMd: "4",
      spaceXs: "12",
      value: name,
      action: setName,
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
      value: email,
      action: setEmail,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Status",
      type: "dropdown",
      dataDropdown: [{id:1, name:"Active"},{id:2, name:"Inactive"}],
      placeholder: "Input Status",
      spaceMd: "4",
      spaceXs: "12",
      value: status === 1 ? {name: "Active"} : {name: "Inactive"},
      action: handleSelect,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "8",
      spaceXs: "12",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      action: doUpdate,
    },{
      label: "Batal",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
      link: '../adminManagement',
    }
  ]

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Detail Admin"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        detailAdmin={detailAdmin}
        status={status}
        orderId={id}
        pageFor={"detail"}
        email={email}
        onSubmit={doUpdate}
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
)(AdminDetailPage)
