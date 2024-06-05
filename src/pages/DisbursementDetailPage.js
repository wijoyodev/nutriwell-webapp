import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setDisbursementMemberDetail } from '../store/actions/memberAction'
import { setDisbursementDetail } from '../store/actions/memberAction'

const DisbursementDetailPage = ({ dispatch, dataMember }) => {
  const { memberId, disbursementId } = useParams()

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [transactionTotal, setTrasactionTotal] = useState(null);

  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [successDate, setSuccessDate] = useState("");
  const [bankAccount, setBankAccount] = useState({});
  const [total, setTotal] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [reason, setReason] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [status, setStatus] = useState("");
  const [isDisbMemberDetail, setisDisbMemberDetail] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const navigate = useNavigate()

  const setData = (data) => {
    let oneData = data.data[0];
    console.log(oneData, "ONEDATA")
    setBankAccount({
      "account_bank" : oneData?.account_bank || "",
      "account_bank_number" : oneData?.account_bank_number || "",
      "account_bank_name" : oneData?.account_bank_name || "",
    })
    setStatus(oneData.status_disbursement)
    setTotal(data.disburse_success.total_value)
    setId(disbursementId)
    setName(oneData.full_name)
    setRequestDate(oneData.created_at)
    setSuccessDate(oneData.success_disbursement_date)
    setIsLoading(false)
  }

  useEffect(()=>{
    if( dataMember.disbursementDetailResp){
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
    if( dataMember.disbursementDetailMemberResp){
      setData(dataMember.disbursementDetailMemberResp)
      // setMemberNetworkSummary(dataReward)
      // setTotalRefNetwork(dataReward.sum_transaction)
      // setLvl1(dataReward.level_1)
      // setLvl2(dataReward.level_2)
      // setLvl3(dataReward.level_3)
      // setLvl4(dataReward.level_4)
      // setLvl5(dataReward.level_5)
    }
  },[dataMember.disbursementDetailMemberResp])

  useEffect(()=>{
    setisDisbMemberDetail(location.pathname.includes("memberDetail"))
    if(location.pathname.includes("memberDetail")){
      setDisbursementMemberDetail(dispatch, memberId,disbursementId)
    }else{
      setDisbursementDetail(dispatch, memberId)
    }
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
      dataFields: "transactionDetail",
      dataFieldsTitle: ["Produk", "QTY", "Harga Per Produk", "Jumlah"], 
      transactionTotal: 'transactionTotal',
      transactionTotalTitle: ["PPH (23 (2%)", "Total yang dapat ditarik"], 
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]


  const dataFormMember = [
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
          label: "TANGGAL REQUEST",
          type: "date",
          spaceMd: "6",
          spaceXs: "12",
          value: requestDate,
        },{
          label: "JUMLAH",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          isCurrency: true,
          value: total,
        },{
          label: "REKENING TUJUAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          bankInfo: true,
          valueAccBank: bankAccount.account_bank,
          valueAccBankNum: bankAccount.account_bank_number,
          valueAccBankName: bankAccount.account_bank_name,
        },{
          label: "TANGGAL BERHASIL",
          type: "date",
          spaceMd: "6",
          spaceXs: "12",
          value: successDate,
        }
      ]
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Disbursement Detail"}
        dataForm={isDisbMemberDetail ? dataFormMember : dataForm}
        linkAccReview={"../accountReview"}
        status={status}
        orderId={disbursementId}
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
