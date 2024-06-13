import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './Disbursement.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import DisbursementMemberTable from "../../Table/MemberDetail/DisbursementMemberTable";
import { setDisbursementGeneral } from '../../../store/actions/memberAction'

const Disbursement = ({
  dispatch, 
  dataMember,
}) => {
  const { orderId, memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  const [locations, setLocations] = useState(null)
  const [onHold, setOnHold] = useState(0);
  const [withDrawn, setWithDrawn] = useState(0);
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [monthlyReward, setMonthlyReward] = useState("");
  const [lvl5, setLvl5] = useState("");
  const [gender, setGender] = useState("");
  const [bankName, setBankName] = useState("");
  const [upline, setUpline] = useState("");
  const [lvl4, setLvl4] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [lvl3, setLvl3] = useState("");
  const [bankAccountName, setBankAccountName] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [referalCode, setReferalCode] = useState("");
  const [dataDisbursement, setDataDisbursement] = useState("");
  
  const navigate = useNavigate()
  
  const setData = (data) => {
    console.log("setData", data)
    setWithDrawn(data?.disburse_success?.total_value)
    setOnHold(data?.disburse_pending?.total_value)
    setMonthlyReward(data)
    setDataDisbursement(data.data)
    setIsLoading(false)
  }

  const dataForm = [
    {
      label: "Berhasil Ditarik",
      type: "labelWithValue",
      spaceMd: "4",
      spaceXs: "4",
      value: withDrawn,
      withCurrency: true,
    },{
      label: "Saldo Tertahan",
      type: "labelWithValue",
      spaceMd: "4",
      spaceXs: "4",
      value: onHold,
      withCurrency: true,
    }
  ]

  useEffect(()=>{
    console.log("dataMember", dataMember)
    if( dataMember.disbursementGeneralResp){
      console.log(dataMember.disbursementGeneralResp, "<<disbursementGeneralResp")
      setData(dataMember.disbursementGeneralResp)
      // setMemberNetworkSummary(dataReward)
      // setTotalRefNetwork(dataReward.sum_transaction)
      // setLvl1(dataReward.level_1)
      // setLvl2(dataReward.level_2)
      // setLvl3(dataReward.level_3)
      // setLvl4(dataReward.level_4)
      // setLvl5(dataReward.level_5)
    }
  },[dataMember.disbursementGeneralResp])

  useEffect(()=>{
    setDisbursementGeneral(dispatch, memberId)
	},[])
  

  // useEffect(()=>{
  //   if( pageFor === "detail" ){
  //     let data = [...dataForm]
  //     data.push({
  //       label: "Deactive",
  //       type: "buttonWhite",
  //       spaceMd: "3",
  //       spaceXs: "3",
  //       onClickAction: doDeactive,
  //     })
  //     data.push({
  //       label: "Cancel",
  //       type: "buttonWhite",
  //       spaceMd: "3",
  //       spaceXs: "3",
  //     })
  //     setDataForm(data)
  //   }
	// },[pageFor])
  // 
	return (
    isLoading ==false &&
    <>
      <Container className={styles.container}>
        <Row>
          <Col className={styles.container_about} xs={12}>
            <Form noValidate validated={validated}>
              <Row className={styles.field_container}>
                {dataForm.map( (item, index)=>{
                    return <FieldHandler item={item} index={index} key={index}/>
                })}
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <DisbursementMemberTable dataDisbursement={dataDisbursement}/>
        </Row>
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataMember: state.member
  };
};

export default connect(
  storage
)(Disbursement)
