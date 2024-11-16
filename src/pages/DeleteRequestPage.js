import React, { useEffect, useState } from "react";
import LoginRegister from '../components/LoginRegister/LoginRegister'
import { connect } from "react-redux";

const DeleteRequestPage = () => {
  const dataField=[
    {
      label: "Name",
      placeholder: "Masukkan nama",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      required: true,
    },
    {
      label: "Email",
      placeholder: "Masukkan email",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      required: true,
    },{
      label: "Phone Number",
      placeholder: "Masukkan nomor telepon",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      required: true,
    },
    {
      label: "Reason",
      placeholder: "Masukkan alasan penghapusan data",
      type: "text",
      spaceMd: "12",
      spaceXs: "12",
      required: true,
    },{
      label: "Request",
      type: "button_submit",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]
  return (    
    <>
      <LoginRegister
        dataField={dataField}
        contentType={'deleteRequest'}
        pageName={"Login as Admin"}
      />
    </>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(DeleteRequestPage)
