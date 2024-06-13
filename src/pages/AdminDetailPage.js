import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setAdminById, setUpdateDetaiAdmin } from '../store/actions/adminAction'

const AdminDetailPage = ({ dispatch, dataAdmin }) => {
  const { adminId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [detailAdmin, setDetailAdmin] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate()

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

  const packageDetail = () => {
    Swal.fire({
      title: 'Ubah Status',
      html: `
        <label for="cars">Kurir</label>
        <br/>
        <select name="cars" id="swal2-select" class="swal2-select">
          <option value="jne">JNE</option>
          <option value="jnt">JNT</option>
          <option value="tiki">TIKI</option>
          <option value="gojek">Gojek</option>
        </select>

        <br/>
        <label for="cars">Nomr Resi</label>
        <input id="swal-input2" class="swal2-input" placeholder="Masukkan nomor Resi"/>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal2-select").value,
          document.getElementById("swal-input2").value
        ];
      }
    })
  }

  const changeStatus = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Ubah Status',
      input: "select",
      text: "Status",
      inputOptions: {
        notPaid: "Pending",
        done: "Selesai",
      },
      inputPlaceholder: "Select Status",
      confirmButtonColor: '#0975B6',
      confirmButtonText: "Simpan",
      showCancelButton: true,
      cancelButtonColor: "grey",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          Swal.fire({
            title: 'Sukses',
            text: "Mengganti status",
            icon: 'success',
            confirmButtonColor: '#0975B6',
          })
        });
      }
    })
  }

  useEffect(()=>{
    if( dataAdmin.adminDetailResp ){
      console.log(dataAdmin.adminDetailResp[0], "<<< dataAdmin.adminDetailResp")
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
  },[])

  const dataForm = [
    {
      label: "ID",
      type: "text",
      notEditable: true,
      placeholder: "Input Max Light Ship Weight (ton)",
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
      value: status == 1 ? {name: "Active"} : {name: "Inactive"},
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
    dataAdmin: state.admin,
  };
};

export default connect(
  storage
)(AdminDetailPage)
