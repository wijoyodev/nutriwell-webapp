import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import { Row, Col, Container, Button, } from 'react-bootstrap'
import ImageUploading from "react-images-uploading";
import { BiTrashAlt, BiEdit } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import styles from './DockingFacility.module.scss'
import 'rsuite/dist/rsuite.min.css';
import { Link } from "react-router-dom";

const DockingFacility = ({
  dockingFacility
}) => {
  const [dataFacilityType, setDataFacilityType] = useState(["graving dock", "floating dock"])
  const [facilityType, setFacilityType] = useState([])
  const [facilityName, setFacilityName] = useState("")
  const [maxLength, setMaxLength] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [maxDraft, setMaxDraft] = useState("");
  const [lithingCapacity, setLithingCapacity] = useState("");
  const [availanbility, setAvailanbility] = useState(true);
  const [availableUntil, setAvailableUntil] = useState("");
  const [toggleMenu, setToggleMenu] = useState({});


  const initToggleMenu = (length) => {
    const initState = new Array(dockingFacility.length).fill(false)
    setToggleMenu(initState)
  }

  const onClickFunc = () => {
  }

  const handleToggleMenu = (index) => {
    const currState = [...toggleMenu]
    currState[index] = !currState[index]
    setToggleMenu(currState)
  }

	useEffect(()=>{
    setFacilityType(dockingFacility.facilityType)
    setFacilityName(dockingFacility.facilityName)
    setMaxLength(dockingFacility.maxLength)
    setMaxWidth(dockingFacility.maxWidth)
    setMaxDraft(dockingFacility.maxDraft)
    setLithingCapacity(dockingFacility.lithingCapacity)
    setAvailanbility(dockingFacility.availanbility)
    setAvailableUntil(dockingFacility.availableUntil)
    initToggleMenu(dockingFacility.length)
	},[dockingFacility])

	return (
		<Container>
      <Row>
        <Col xs={{span: "3", offset: "9"}}>
          <Link to="../marine/preview">
            <Button className={styles.save_button} onClick={()=>onClickFunc()} type="submit">
              Preview
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className={styles.middle_container}>
        <Col xs="12">
          <Row>
            {
              dockingFacility.length <= 0 ?
                <Col xs="12" className={styles.empty_state}>
                  <img height={"120px"} width={"120px"} src={"/images/emptyStateGrey.png"}/>
                  <p>
                    <br/>
                    Add your Docking Facility and the availability
                    <br/>
                    for information to vessel owners out there
                  </p>
                  <Button className={styles.save_button} type="submit">
                    Add Docking Facility
                  </Button>
                </Col>
              :
              dockingFacility.map( (item, index) => {
                return (
                  <Col md={6} xs={6} key={index} className={styles.card_wrapper}>
                    <Row className={styles.card_facility}>
                      <Col xs="6">
                        <p className={styles.facility_name}>
                          {item.facilityName}
                        </p>
                        <p className={styles.availability}>
                          {item.availability ? "Available" : "Occupied" }
                        </p>
                      </Col>
                      <Col xs={{ span:1 , offset:4}}>
                        <BsThreeDots onClick={()=>handleToggleMenu(index)} className={styles.menu_3dots}/>
                        {
                          toggleMenu[index] && 
                            <Container className={styles.box_menu}>
                              <Row>
                                <Col xs={12} className={styles.hover_menu}>
                                  <BiEdit
                                    color={"blue"} 
                                    size="17"
                                  />
                                  <Link to="../editFacility/2" className={styles.button_add_dock}>
                                    <font className={styles.text_menu}>
                                      Edit Facility
                                    </font>
                                  </Link>
                                </Col>
                                <Col xs={12} className={styles.hover_menu_2}>
                                  <BiTrashAlt 
                                    color={"#cd1919"} 
                                    size="17"
                                  />
                                  <font className={styles.text_menu}>
                                    Delete Facility
                                  </font>
                                </Col>
                              </Row>
                            </Container>
                        }
                      </Col>
                    </Row>
                  </Col>
                )
              })}
              <Col md={6} xs={6} className={styles.card_wrapper_2}>
                <Link to={"../addFacility"} className={styles.button_add_dock}>
                  <Row className={styles.card_facility_2}>
                      <Col xs="6">
                          <p className={styles.facility_name}>
                            Add Docking Facility
                          </p>
                      </Col>
                      <Col xs={{ span:1 , offset:4}}>
                        <BsPlus size="22"/>
                      </Col>
                  </Row>
                </Link>
              </Col>
          </Row>
        </Col>
      </Row>
		</Container>
	);
};

export default DockingFacility;
