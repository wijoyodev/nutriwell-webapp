import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setUploadFile, resetUploadFile, setDetailShipyard, resetDetailShipyard, setAllShipyardByShipyardId, setUpdateDetailShipyard } from '../store/actions/shipyardAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'

const DisbursementDetailPage = ({ dispatch, dataShipyard }) => {
  const { disbursementId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [allShipyard, setAllShipyard] = useState(null);
  const [bankName, setBankName] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [transactionDetail, setTransactionDetail] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [reason, setReason] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [status, setStatus] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const navigate = useNavigate()

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
      bankNumber,
      bankAccountName,
      status,
      transactionDate,
      transactionDetail: transactionDetail,
      transactionNumber: transactionNumber,
      reason: reason,
      customerDetail: customerDetail,
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
      setRequestDate(data.requestDate)
      setBankName(data.bankName)
      setBankNumber(data.bankNumber)
      setBankAccountName(data.bankAccountName)
      setTransactionDetail(data.transactionDetail)
      setTransactionNumber(data.transactionNumber)
      setReason(data.reason)
      setCustomerDetail(data.customerDetail)
      setStatus(data.status)
      setTransactionDate(data.transactionDate)
      setIsVerified(data.account)
      setTrasactionTotal(data.account.isActive)
    }
  },[dataShipyard.detailShipyardResp])

  useEffect(()=>{
    if( dataShipyard.allShipyardByShipyardIdResp ){
      setAllShipyard(dataShipyard.allShipyardByShipyardIdResp)
      setIsLoading(false)
    }
  },[dataShipyard.allShipyardByShipyardIdResp])

  useEffect(()=>{
    if( dataShipyard.uploadFileResp ){
      switch (dataShipyard.uploadFileResp.section) {
        case "transactionDetail" :
          setTransactionDetail(dataShipyard.uploadFileResp.url)
          break;
        case "transactionNumber" :
          setTransactionNumber(dataShipyard.uploadFileResp.url)
          break;
        case "reason" :
          setReason(dataShipyard.uploadFileResp.url)
          break;
        case "customerDetail" :
          setCustomerDetail(dataShipyard.uploadFileResp.url)
          break;
        default :
          setTransactionDetail(dataShipyard.uploadFileResp.url)
          break;
      } 
      resetUploadFile(dispatch)
    }
  },[dataShipyard.uploadFileResp])

  useEffect(()=>{
    setDetailShipyard(dispatch, disbursementId)
    setAllShipyardByShipyardId(dispatch, disbursementId)

    // FOR SLICING DATA ONLY 
    setId("ODO00001")
    setName("PT Bumi Makmur")
    setRequestDate("oke")
    setBankName("BCA")
    setBankNumber("5082172373")
    setBankAccountName("Samsul Saripudin")
    setTransactionDetail([{
      productName: "GARAM kurang natrium",
      quantity: 30,
      price: 5000,
      total: 150000
    },{
      productName: "Biji Bnga Matahari",
      quantity: 3,
      price: 1000,
      total: 150000
    }])
    setTransactionNumber("973528139")
    setReason("oke")
    setCustomerDetail({
      name: "John Doe",
      phone: "085712381238",
      address: "Ruko Prominence, Jl. Jalur Sutera Boulevard No.2, Kab Tangerang, Banten, ID 12345",
      paymentMethod: "Transfer Bank",
      shippingMethod: "JNE Regular",
      trasactionDate: 1709910356,
      shippingNo: "032483294203942",
      shippingDate: 1709910356,
    })
    setStatus("Berhasil")
    setTransactionDate(1709743549)
    setIsVerified("oke")
    setTrasactionTotal({
      pph: 30000,
      totalPrice: 153000,
    })
    // FOR SLICING DATA ONLY

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
        },{
          label: "METODE PEMBAYARAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          isPaymentDone: false,
          value: customerDetail.paymentMethod,
          detailInfo: customerDetail.trasactionDate,
        },{
          label: "TANGGAL REQUEST",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: transactionDate,
        }
      ]
    },{
      label: "Informasi Penarikan",
      type: "sectionTable",
      dataFields: transactionDetail,
      dataFieldsTitle: ["Produk", "QTY", "Harga Per Produk", "Jumlah"], 
      transactionTotal: transactionTotal,
      transactionTotalTitle: ["PPH (23 (2%)", "Total yang dapat ditarik"], 
    },
    {
      label: "Ubah Status",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      action: changeStatus,
      link: "../accountReview"
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  return (    
    isLoading === false && transactionDetail.length > 0 && transactionTotal && 
    <div className="container_right_form">
      <MainForm
        pageName={"Disbursement Detail"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        allShipyard={allShipyard}
        status={status}
        orderId={id}
        pageFor={"detail"}
        isVerified={isVerified}
        requestDate={requestDate}
        onSubmit={doUpdate}
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
)(DisbursementDetailPage)
