import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setDisbursementDetail } from '../store/actions/memberAction'

const DisbursementDetailPage = ({ dispatch, dataMember }) => {
  const { memberId } = useParams()

  const [isLoading, setIsLoading] = useState(false);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
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

  const setData = (data) => {
    console.log("setData", data)
    setBankName(data)
    setId(data)
    setName(data)
    setRequestDate(data)
    setBankNumber(data)
    setBankAccountName(data)
    setTransactionDetail(data)
    setTransactionNumber(data)
    setReason(data)
    setCustomerDetail(data)
    setStatus(data)
    setTransactionDate(data)
  }

  useEffect(()=>{
    console.log("dataMember", dataMember)
    if( dataMember.disbursementDetailResp){
      console.log(dataMember.disbursementDetailResp, "<<disbursementDetailResp")
      setData(dataMember.disbursementDetailResp)
      // setMemberNetworkSummary(dataReward)
      // setTotalRefNetwork(dataReward.sum_transaction)
      // setLvl1(dataReward.level_1)
      // setLvl2(dataReward.level_2)
      // setLvl3(dataReward.level_3)
      // setLvl4(dataReward.level_4)
      // setLvl5(dataReward.level_5)
    }
  },[dataMember.disbursementDetailResp])

  useEffect(()=>{
    setDisbursementDetail(dispatch, memberId)
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
        status={status}
        orderId={id}
        pageFor={"detail"}
        isVerified={isVerified}
        requestDate={requestDate}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataMember: state.member
  };
};

export default connect(
  storage
)(DisbursementDetailPage)
