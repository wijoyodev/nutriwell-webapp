import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './DockFacility.module.scss'
import { RiErrorWarningLine } from 'react-icons/ri'
import { BiTrashAlt, BiEdit } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setShipyardFacilityList,  resetOneShipyardFacility, resetUpdateFacilityResponse } from '../../../store/actions/shipyardFacilityAction'

const DockFacility = ({
  dispatch, 
  dataShipyardFacility,
  setPosition,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [dataFacility, setDataFacility] = useState([])
  const shipyardId = localStorage.getItem('shipyardId')
  const navigate = useNavigate()
  
  const images = [
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
  ];

  const nextPage = () =>{
    setPosition("Ship Building")
    localStorage.setItem("pagePos","Ship Building")
  }

  useEffect(()=>{
    if( dataShipyardFacility.shipyardFacilityListResp ){
      setDataFacility(dataShipyardFacility.shipyardFacilityListResp)
      setIsLoading(false)
    }
  },[dataShipyardFacility.shipyardFacilityListResp])

  useEffect(()=>{
    setShipyardFacilityList(dispatch, shipyardId)
    resetOneShipyardFacility(dispatch)
    resetUpdateFacilityResponse(dispatch)
  },[])

	return (
    isLoading === false &&
    <>
      <Container className={styles.container}>
        <Row>
          {dataFacility.length > 0 &&
            dataFacility.map((item, index) => (
              <Col xs={6} key={index} className={styles.wrapper_card}>
                <Link to={"../editFacility/" + item.id} className={styles.button_add_dock}>
                  <Row className={styles.card}>
                    <Col xs={12}>
                      <p className={styles.card_title}>
                        {item.name}
                      </p>
                      <p>
                        {item.isAvailable ? 
                          <font className={styles.card_status_avail}> AVAILABLE </font>
                        :
                          <font className={styles.card_status_occupied}> OCCUPIED </font>
                        }
                      </p>
                    </Col>
                  </Row>
                </Link>
              </Col>
            ))}
            <Col md={6} xs={6} className={styles.wrapper_card}>
              <Link to={`..//orderManagementDetail/${shipyardId}/newShipyard/addFacility`} className={styles.button_add_dock}>
                <Row className={styles.card_add}>
                  <Col xs="10">
                      <p className={styles.facility_name}>
                        Add Docking Facility
                      </p>
                  </Col>
                  <Col xs={{ span:1 , offset:0}}>
                    <BsPlus size="22"/>
                  </Col>
                </Row>
              </Link>
            </Col>
        </Row>
        <Row>
          <Col md={6} xs={6}>
            <div onClick={()=>nextPage()}>
              <Button className={styles.cancel_button} type="submit">
                Next
              </Button>
            </div>
          </Col>
        </Row>

      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataShipyardFacility: state.shipyardFacility
  };
};

export default connect(
  storage
)(DockFacility)

