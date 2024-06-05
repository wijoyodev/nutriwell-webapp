import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './ReferenceNetwork.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import ReferenceNetworkTable from "../../Table/MemberDetail/ReferenceNetworkTable";
import { setNetworkById, setNetworkSummaryById } from '../../../store/actions/memberAction'

const ReferenceNetwork = ({
  pageFor,
  dispatch, 
  dataMember,
  setPosition,
  dataOneShipyard,
}) => {
  const { orderId, memberId } = useParams()
  const [memberNetwork, setMemberNetwork] = useState("");
  const [memberNetworkSummary, setMemberNetworkSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  const [locations, setLocations] = useState(null)
  const [lvl1, setLvl1] = useState("");
  const [lvl2, setLvl2] = useState("");
  const [lvl3, setLvl3] = useState("");
  const [lvl4, setLvl4] = useState("");
  const [lvl5, setLvl5] = useState("");
  const [totalRefNetwork, setTotalRefNetwork] = useState("");
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [gender, setGender] = useState("");
  const [bankName, setBankName] = useState("");
  const [upline, setUpline] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [bankAccountName, setBankAccountName] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [referalCode, setReferalCode] = useState("");
  
  const navigate = useNavigate()

  const initImage = (allImages) => {
    let data = []
    for( let i=0 ;i<allImages.length ; i++){
      data.push({data_url: allImages[i].imageUrl})
    }
    setImages(data)
  }

  const setData = (data) => {
    setTotalRefNetwork("MEI02")
    setLvl1("10")
    setLvl2("20")
    setLvl3("30")
    setLvl4("40")
    setLvl5("50")
  }

  useEffect(()=>{
    // testing purpose only
      // setData(dataOneShipyard)
  },[])

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  useEffect(()=>{
    if( dataOneShipyard !== "not available" ){
      setData(dataOneShipyard)
    }
  },[dataOneShipyard])
  
  const dataForm = [
    {
      label: "Total Reference Network",
      type: "labelWithValue",
      spaceMd: "12",
      spaceXs: "12",
      value: totalRefNetwork,
    },{
      label: "Level 1",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: lvl1,
    },{
      label: "Level 2",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: lvl2,
    },{
      label: "Level 3",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: lvl3,
    },{
      label: "Level 4",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: lvl4,
    },{
      label: "Level 5",
      type: "labelWithValue",
      spaceMd: "2",
      spaceXs: "2",
      value: lvl5,
    }
  ]

  useEffect(()=>{
    if( dataMember.memberNetworkListResp){
      console.log(dataMember.memberNetworkListResp, "<<memberNetworkListResp")
      setMemberNetwork(dataMember.memberNetworkListResp)
      setIsLoading(false)
      setTotalRefNetwork(dataMember.memberNetworkListResp.limit)
      setLvl1(dataMember.memberNetworkListResp.limit)
      setLvl2(dataMember.memberNetworkListResp.limit)
      setLvl3(dataMember.memberNetworkListResp.limit)
      setLvl4(dataMember.memberNetworkListResp.limit)
      setLvl5(dataMember.memberNetworkListResp.limit)
    }
  },[dataMember.memberNetworkListResp])

  useEffect(()=>{
    if( dataMember.memberNetworkSummaryResp){
      console.log(dataMember.memberNetworkSummaryResp, "<<memberNetworkSummaryResp")
      let dataStat = dataMember.memberNetworkSummaryResp.totalStat
      setMemberNetworkSummary(dataStat)
      setTotalRefNetwork(dataStat.sum_transaction)
      setLvl1(dataStat.level_1)
      setLvl2(dataStat.level_2)
      setLvl3(dataStat.level_3)
      setLvl4(dataStat.level_4)
      setLvl5(dataStat.level_5)
    }
  },[dataMember.memberNetworkSummaryResp])

  useEffect(()=>{
    setNetworkById(dispatch, 0, memberId)
    setNetworkSummaryById(dispatch, memberId)
	},[])
  
	return (
    isLoading ==false && memberNetwork && memberNetworkSummary &&
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
          <ReferenceNetworkTable memberNetwork={memberNetwork}/>
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
)(ReferenceNetwork)
