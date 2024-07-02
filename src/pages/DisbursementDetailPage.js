import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { setDisbursementMemberDetail } from '../store/actions/memberAction'

const DisbursementDetailPage = ({ dispatch, dataMember }) => {
  const { memberId, disbursementId } = useParams()
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionTotal, setTrasactionTotal] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [successDate, setSuccessDate] = useState("");
  const [bankAccount, setBankAccount] = useState({});
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [isDisbMemberDetail, setisDisbMemberDetail] = useState("");

  const setData = (data) => {
    let oneData = data.data[0];
    setBankAccount({
      "account_bank" : oneData?.account_bank || "",
      "account_bank_number" : oneData?.account_bank_number || "",
      "account_bank_name" : oneData?.account_bank_name || "",
    })
    setStatus(oneData.status_disbursement)
    setTotal(data.disburse_success?.total_value || data.disburse_pending?.total_value)
    setId(disbursementId)
    setName(oneData.full_name)
    setRequestDate(oneData.created_at)
    setSuccessDate(oneData.success_disbursement_date)
    setIsLoading(false)

    setTrasactionTotal({
      totalPrice: oneData.disbursement_value,
      pph: oneData.total_tax,
    })
  }

  useEffect(()=>{
    if( dataMember.disbursementDetailResp){
      setData(dataMember.disbursementDetailResp)
    }
  },[dataMember.disbursementDetailResp])

  useEffect(()=>{
    if( dataMember.disbursementDetailMemberResp){
      setData(dataMember.disbursementDetailMemberResp)
    }
  },[dataMember.disbursementDetailMemberResp])

  useEffect(()=>{
    setisDisbMemberDetail(location.pathname.includes("memberDetail"))
    setDisbursementMemberDetail(dispatch, memberId,disbursementId)
	},[dispatch, memberId,disbursementId, location.pathname])

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
          label: "REKENING TUJUAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          bankInfo: true,
          valueAccBank: bankAccount.account_bank,
          valueAccBankNum: bankAccount.account_bank_number,
          valueAccBankName: bankAccount.account_bank_name,
        },{
          label: "TANGGAL REQUEST",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: requestDate,
        }
      ]
    },{
      label: "Informasi Penarikan",
      type: "sectionTable",
      transactionInfo: true,
      dataFields: "transactionDetail",
      dataFieldsTitle: ["Deskripsi", "Jumlah"], 
      transactionDescription: "Request Penarikan",
      transactionTotal: transactionTotal,
      transactionTotalTitle: ["PPN (11%)", "Total yang dapat ditarik"], 
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
