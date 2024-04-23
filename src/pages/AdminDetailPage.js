import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setUploadFile, resetUploadFile, setDetailShipyard, resetDetailShipyard, setAllShipyardByShipyardId, setUpdateDetailShipyard } from '../store/actions/shipyardAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const AdminDetailPage = ({ dispatch, dataShipyard }) => {
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

  const triggerUpload = (e, section) => {
    setUploadFile(dispatch, e.target.files[0], section)
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

    // FOR SLICING DATA ONLY 
    setId("ODO00001")
    setName("Yanti Sumartini")
    setEmail("yanti@sumartini@yahooo.com")
    setStatus("Berhasil")
    // FOR SLICING DATA ONLY

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
      value: status,
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
        pageName={"Detail Admin"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        allShipyard={allShipyard}
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
    dataShipyard: state.shipyard,
  };
};

export default connect(
  storage
)(AdminDetailPage)
