import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './Reward.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import RewardTable from "../../Table/MemberDetail/RewardTable";
import { setRewardDetail } from '../../../store/actions/memberAction'

const Reward = ({
  pageFor,
  dispatch, 
  dataShipyard,
  setPosition,
  dataOneShipyard,
  dataMember,
}) => {
  const { orderId, memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  const [locations, setLocations] = useState(null)
  const [claimableReward, setClaimableReward] = useState("");
  const [totalReward, setTotalReward] = useState("");
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
  const [dataReward, setDataReward] = useState("");
  
  const navigate = useNavigate()

  const setData = (data) => {
    setTotalReward(data.total_reward)
    setClaimableReward(data.total_cashable)
    setMonthlyReward(data.total_this_month)
    setDataReward(data.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    if( dataMember.rewardDetailResp){
      console.log(dataMember.rewardDetailResp, "<<rewardDetailResp")
      setData(dataMember.rewardDetailResp)
      // setMemberNetworkSummary(dataReward)
      // setTotalRefNetwork(dataReward.sum_transaction)
      // setLvl1(dataReward.level_1)
      // setLvl2(dataReward.level_2)
      // setLvl3(dataReward.level_3)
      // setLvl4(dataReward.level_4)
      // setLvl5(dataReward.level_5)
    }
  },[dataMember.rewardDetailResp])

  useEffect(()=>{
    setRewardDetail(dispatch, memberId)
	},[])
  
  const dataForm = [
    {
      label: "Total Reward",
      type: "labelWithValue",
      spaceMd: "12",
      spaceXs: "12",
      value: totalReward,
      withCurrency: true,
    },{
      label: "Reward yang bisa dicairkan",
      type: "labelWithValue",
      spaceMd: "4",
      spaceXs: "4",
      value: claimableReward,
      withCurrency: true,
    },{
      label: "Reward bulan ini",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: monthlyReward,
      withCurrency: true,
    }
  ]
  
	return (
    isLoading == false &&
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
          <RewardTable dataReward={dataReward}/>
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
)(Reward)
