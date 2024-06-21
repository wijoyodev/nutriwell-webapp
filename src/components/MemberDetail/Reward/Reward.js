import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, } from 'react-bootstrap'
import styles from './Reward.module.scss'
import { useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import { connect } from "react-redux";
import RewardTable from "../../Table/MemberDetail/RewardTable";
import { setRewardDetail } from '../../../store/actions/memberAction'

const Reward = ({
  dispatch, 
  dataMember,
}) => {
  const { memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [claimableReward, setClaimableReward] = useState("");
  const [totalReward, setTotalReward] = useState("");
  const [monthlyReward, setMonthlyReward] = useState("");
  const [dataReward, setDataReward] = useState("");
  
  const setData = (data) => {
    setTotalReward(data.total_reward)
    setClaimableReward(data.total_cashable)
    setMonthlyReward(data.total_this_month)
    setDataReward(data)
    setIsLoading(false)
  }

  useEffect(()=>{
    if( dataMember.rewardDetailResp){
      setData(dataMember.rewardDetailResp)
    }
  },[dataMember.rewardDetailResp])

  useEffect(()=>{
    setRewardDetail(dispatch, memberId)
	},[dispatch, memberId])
  
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
    isLoading === false &&
    <>
      <Container className={styles.container}>
        <Row>
          <Col className={styles.container_about} xs={12}>
            <Form noValidate>
              <Row className={styles.field_container}>
                {dataForm.map( (item, index)=>{
                  return <FieldHandler item={item} index={index} key={index}/>
                })}
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <RewardTable 
            dataReward={dataReward} 
            setRewardDetail={setRewardDetail} 
            dispatch={dispatch}
          />
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
