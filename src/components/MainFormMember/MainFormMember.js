import React, { useEffect, useState } from "react";
import { Row, Col, } from 'react-bootstrap'
import styles from './MainFormMember.module.scss'
import Information from '../MemberDetail/Information/Information'
import ReferenceNetwork from '../MemberDetail/ReferenceNetwork/ReferenceNetwork'
import { connect } from "react-redux";
import 'rsuite/dist/rsuite.min.css';
import OrderTable from "../Table/MemberDetail/OrderTable";
import Reward from "../MemberDetail/Reward/Reward";
import Disbursement from "../MemberDetail/Disbursement/Disbursement";

const MainFormMember = ({
  pageName,
  pageFor,
  dataOneMember,
  orderId,
}) => {
  const [position, setPosition] = useState("")

  useEffect(()=>{
    if(position && localStorage.getItem('memberDetailPos') !== position){
      localStorage.setItem('memberDetailPos', position)
    }
  },[position])

  useEffect(()=>{
    if(!localStorage.getItem('memberDetailPos')){
      localStorage.setItem('memberDetailPos','info')
      setPosition('info')
    }else{
      setPosition(localStorage.getItem('memberDetailPos'))
    }
  },[localStorage.getItem('memberDetailPos')])

	
	return (
		<>
      { pageFor === "detail" && dataOneMember &&
      <>
        <Row>
          <Col xs={9}>
            <p className={styles.main_title_2}>
              {pageName}
            </p>
          </Col>
        </Row>
      </>
      }
      <Row>
        <Col md="12" xs="12" className={styles.member_detail_section}>
          <Row className={styles.navbar}>
            <Col 
              xs="2" 
              className={position === "info" ? styles.nav_item_active : styles.nav_item}
              onClick={()=>setPosition("info")}
            >
              <p> INFORMASI </p>
            </Col>
            <Col 
              xs="3" 
              className={position === "refNetwork" ? styles.nav_item_active : styles.nav_item}
              onClick={()=>setPosition("refNetwork")}
            >
              <p> REFERENCE NETWORK </p>
            </Col>
            <Col 
              xs="2" 
              className={position === "order" ? styles.nav_item_active : styles.nav_item}
              onClick={()=>setPosition("order")}
            >
              <p> PESANAN </p>
            </Col>
            <Col 
              xs="2" 
              className={position === "reward" ? styles.nav_item_active : styles.nav_item}
              onClick={()=>setPosition("reward")}
            >
              <p> REWARD </p>
            </Col>
            <Col 
              xs="2" 
              className={position === "disbursement" ? styles.nav_item_active : styles.nav_item}
              onClick={()=>setPosition("disbursement")}
            >
              <p> DISBURSEMENT </p>
            </Col>
            <Col xs="1" className={styles.nav_item}>
              <p> &nbsp; </p>
            </Col>
          </Row>
          <Row className={styles.section_selected}>
            <Col>
              {position === "info" && <Information pageFor={pageFor} setPosition={setPosition} dataOneMember={dataOneMember}/>} 
              {position === "refNetwork" && <ReferenceNetwork pageFor={pageFor} setPosition={setPosition} dataOneMember={dataOneMember}/>} 
              {position === "order" && <OrderTable setPosition={setPosition}/>}
              {position === "reward" && <Reward setPosition={setPosition}/>}
              {position === "disbursement" && <Disbursement setPosition={setPosition}/>}
            </Col>
          </Row>
        </Col>
      </Row>
		</>
	);
};

const storage = state => {
  return {
    dataMember: state.member,
  };
};

export default connect(
  storage
)(MainFormMember)

