import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './NewShipyard.module.scss'
import { AiOutlineCheck } from 'react-icons/ai'
import About from './About/About'
import { connect } from "react-redux";
import DockFacility from "./DockFacility/DockFacility";
import ShipBuilding from "./ShipBuilding/ShipBuilding";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";
import { setVerifyUser, resetVerifyUser, setForgotPassword } from '../../store/actions/loginRegisterAction'
import { setOneShipyard, resetOneShipyard } from '../../store/actions/shipyardAction'

const NewShipyard = ({
  pageName,
  pageFor,
  isActive,
  isVerified,
  dispatch, 
  dataLoginRegister, 
  dataShipyard,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState("About")
  const [dataOneShipyard, setDataOneShipyard] = useState("")
  const { shipyardId } = useParams()

  const doResendPass = (e) => {
    e.preventDefault()
    setForgotPassword(dispatch, dataOneShipyard.email)
  }
  
  const doVerify = () => {
    Swal.fire({
      text: "Are you sure want to verify this user?",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#a9acaf',
      cancelButtonText: 'No',
      cancelButtonColor: '#163b55',
      showCloseButton: true,
      showCancelButton: true,
    })
  }

  const checkPageFor = () => {
    if( pageFor === "detail" ){
      setDataOneShipyard("")
      setIsLoading(true)
      const currPoss = localStorage.getItem("pagePos")
      setPosition(currPoss)
      setOneShipyard(dispatch, shipyardId)
    }else{
      setDataOneShipyard("not available")
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if( !localStorage.getItem("pagePos") ){
      localStorage.setItem("pagePos","About")
    }
	},[])
  
  useEffect(()=>{
    checkPageFor()
	},[shipyardId, pageFor])

  useEffect(()=>{
    if( dataShipyard.oneShipyardResp ){
      setDataOneShipyard(dataShipyard.oneShipyardResp)
      resetOneShipyard(dispatch)
      setIsLoading(false)
    }
	},[dataShipyard.oneShipyardResp])

	return (
    isLoading === false && dataOneShipyard && 
    <div className={styles.container}>
      <Row className="justify-content-between">
        <Col xs={{ span: 9 }}>
          <p className={styles.main_title_2}>
            {pageName}
            &nbsp; &nbsp; &nbsp; 
          </p>
        </Col>
      </Row>
      <Row className={styles.navbar}>
        <Col 
          xs="2" 
          className={position === "About" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>setPosition("About")}
        >
          <p> About </p>
        </Col>
        <Col 
          xs="2" 
          className={position === "Dock Facility" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>setPosition("Dock Facility")}
        >
          <p> Dock Facility </p>
        </Col>
        <Col 
          xs="2" 
          className={position === "Ship Building" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>setPosition("Ship Building")}
        >
          <p> Ship Building </p>
        </Col>
        <Col xs="6" className={styles.nav_item}>
          <p> &nbsp; </p>
        </Col>
      </Row>
      <Row className={styles.section_selected}>
        <Col>
          {position === "About" && <About pageFor={pageFor} setPosition={setPosition} dataOneShipyard={dataOneShipyard}/>} 
          {position === "Dock Facility" && <DockFacility setPosition={setPosition}/>}
          {position === "Ship Building" && <ShipBuilding setPosition={setPosition}/>} 
        </Col>
      </Row>
    </div>
	);
};

const storage = state => {
  return {
    dataShipyard: state.shipyard,
    dataLoginRegister: state.loginRegister,
  };
};

export default connect(
  storage
)(NewShipyard)
