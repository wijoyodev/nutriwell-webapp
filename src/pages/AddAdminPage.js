import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { setCreateAdmin } from '../store/actions/adminAction'

const AddAdminPage = ({ dispatch, dataAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const doCreateAdmin = (e) => {
    e.preventDefault()
    const dataCreate = {
      name,
      email,
      role: "1",
      password,
    }
    setCreateAdmin(dispatch, dataCreate)
  }

  useEffect(()=>{
    if( dataAdmin.createAdminResp ){
      let data = dataAdmin.createAdminResp
      setName(data.name)
      setEmail(data.email)
      setIsLoading(false)
    }
  },[dataAdmin.createAdminResp])

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
        pageFor={"detail"}
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
