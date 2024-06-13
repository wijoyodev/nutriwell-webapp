import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainFormMember from '../components/MainFormMember/MainFormMember'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setDetailMember } from '../store/actions/memberAction'

const MemberDetailPage = ({ dispatch, dataMember }) => {
  const { memberId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [oneMember, setOneMember] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountBankName, setAccountBankName] = useState("");
  const [accountBankNumber, setAccountBankNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [dob, setDOB] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
      email,
      status,
    }
    // setUpdateDetailShipyard(dispatch, dataUpdate, id)
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
    if( dataMember.detailMemberResp ){
      let data = dataMember.detailMemberResp
      setOneMember(data)
      setIsLoading(false)
    }
  },[dataMember.detailMemberResp])

  useEffect(()=>{
    setDetailMember(dispatch, memberId)
  },[])

  const dataForm = [
    {
      label: "Disbursement Detail",
      type: "section",
      dataFields: [
        {
          label: "ID DISBURSEMENT",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: id,
        },{
          label: "CUSTOMER",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: name,
        }
      ]
    },{
      label: "Ubah Status",
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
    oneMember && 
    <div className="container_right_form">
      <MainFormMember
        pageName={"Detail Member"}
        // dataForm={dataForm}
        linkAccReview={"../accountReview"}
        dataOneMember={oneMember}
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
    dataMember: state.member,
  };
};

export default connect(
  storage
)(MemberDetailPage)
