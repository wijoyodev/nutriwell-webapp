import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import { Row, Col, Form, InputGroup, Container, Button, } from 'react-bootstrap'
import { BiTrashAlt, BiEdit } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import styles from './ShipBuilding.module.scss'
import 'rsuite/dist/rsuite.min.css';
import { AiFillDingtalkSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const ShipBuilding = ({
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
  const [toggleDetails, setToggleDetails] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(true);

  const onClickFunc = () => {
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
        <Col xs={12}>
          <Row>
            <Col md={6} xs={6}>
              <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Is this a Ship Building Shipyard</Form.Label>
              <InputGroup>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label={toggleDetails ? "Yes" : "No"}
                  className={styles.switch}
                  onChange={()=>setToggleDetails(!toggleDetails)}
                />
              </InputGroup >
            </Col>
          </Row>
          {toggleDetails && 
            <Row>
              <Col xs={12}>
                <Form.Label htmlFor="basic-url" className={styles.field_title}>Description *</Form.Label>
                { toggleEdit ? 
                  <InputGroup >
                    <Form.Control
                      className={styles.field_form}
                      as="textarea"
                      placeholder={"input descriptions"}
                      style={{ height: '100px' }}
                      value={"asodkaodkaodkaodkasodkaodkasodkasod"}
                    />
                  </InputGroup>
                :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {"asdasdasd"} </Form.Label>
                  </>
                }
                
              </Col>
              <Col xs={12}>
                <Form.Label htmlFor="basic-url" className={styles.field_title}>Ships type</Form.Label>
                <Row>
                  {toggleEdit ?
                    <>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Offshore Support Vessels"
                            name="group1"
                            id={`Offshore`}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Barges"
                            name="group3"
                            id={`Barges`}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Dredger"
                            name="group2"
                            id={`Dredger`}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Tankers"
                            name="group3"
                            id={`Tankers`}
                            />
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Tugs"
                            name="group3"
                            id={`Tugs`}
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={6}>
                        <InputGroup >
                          <Form.Check
                            inline
                            label="Others"
                            name="group3"
                            id={`Others`}
                            />
                        </InputGroup>
                      </Col>
                    </>
                    :
                    <p>oke</p> 
                  }
                </Row>
              </Col>
              <Col xs={12} className="mt-4">
                <Row>
                  <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Ship Portoflio</Form.Label>
                  <Col md={6} xs={6} className={styles.card_wrapper}>
                    <Row className={styles.card_facility}>
                      <Col xs="4">
                        <img height={"100px"} width={"100px"} src={"/images/shipA.png"}/>
                      </Col>
                      <Col xs="8">
                        <Row>
                          <Col xs="4">
                            <p className={styles.facility_name}>
                              Ship A
                            </p>
                          </Col>
                          { toggleEdit && 
                            <Col xs={{span:2, offset:6}} className="pb-1">
                              <BiTrashAlt 
                                color={"#cd1919"} 
                                size="17"
                              />
                            </Col>
                          }
                        </Row>
                        <p className={styles.description}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla interdum dolor vitae nisl ornare, sit amet tincidunt purus egestas.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} xs={6} className={styles.card_wrapper}>
                    <Row className={styles.card_facility}>
                      <Col xs="4">
                        <img height={"100px"} width={"100px"} src={"/images/shipA.png"}/>
                      </Col>
                      <Col xs="8">
                        <Row>
                          <Col xs="4">
                            <p className={styles.facility_name}>
                              Ship A
                            </p>
                          </Col>
                          { toggleEdit && 
                            <Col xs={{span:2, offset:6}} className="pb-1">
                              <BiTrashAlt 
                                color={"#cd1919"} 
                                size="17"
                              />
                            </Col>
                          }
                        </Row>
                        <p className={styles.description}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla interdum dolor vitae nisl ornare, sit amet tincidunt purus egestas.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                    {toggleEdit && 
                      <Col md={6} xs={6} className={styles.card_wrapper_2}>
                        <Link to={"../addPorto"} className={styles.button_add_dock}>
                          <Row className={styles.card_facility_2}>
                            <Col xs="6">
                              <p className={styles.facility_name}>
                                Add Portofolio
                              </p>
                            </Col>
                            <Col xs={{ span:1 , offset:4}}>
                              <BsPlus size="22"/>
                            </Col>
                          </Row>
                        </Link>
                      </Col>
                    }
                </Row>
              </Col>
              <Col xs={12} className="mt-4">
                <Row>
                  <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Ready Stock Ships</Form.Label>
                  <Col md={6} xs={6} className={styles.card_wrapper}>
                    <Row className={styles.card_facility}>
                      <Col xs="4">
                        <img height={"100px"} width={"100px"} src={"/images/shipA.png"}/>
                      </Col>
                      <Col xs="8">
                        <Row>
                          <Col xs="8">
                            <p className={styles.facility_name}>
                              Ship A
                            </p>
                            <p className={styles.facility_name}>
                              Rp 200.000.000
                            </p>
                          </Col>
                          { toggleEdit && 
                            <Col xs={{span:2, offset:2}} className="pb-1">
                              <BiTrashAlt 
                                color={"#cd1919"} 
                                size="17"
                              />
                            </Col>
                          }
                        </Row>
                        <p className={styles.description}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla interdum dolor vitae nisl ornare, sit amet tincidunt purus egestas.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} xs={6} className={styles.card_wrapper}>
                    <Row className={styles.card_facility}>
                      <Col xs="4">
                        <img height={"100px"} width={"100px"} src={"/images/shipA.png"}/>
                      </Col>
                      <Col xs="8">
                        <Row>
                          <Col xs="8">
                            <p className={styles.facility_name}>
                              Ship A
                            </p>
                            <p className={styles.facility_name}>
                              Rp 200.000.000
                            </p>
                          </Col>
                          { toggleEdit && 
                            <Col xs={{span:2, offset:2}} className="pb-1">
                              <BiTrashAlt 
                                color={"#cd1919"} 
                                size="17"
                              />
                            </Col>
                          }
                        </Row>
                        <p className={styles.description}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nulla interdum dolor vitae nisl ornare, sit amet tincidunt purus egestas.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  { toggleEdit && 
                    <Col md={6} xs={6} className={styles.card_wrapper_2}>
                      <Link to={"../addShip"} className={styles.button_add_dock}>
                        <Row className={styles.card_facility_2}>
                          <Col xs="6">
                            <p className={styles.facility_name}>
                              Add Ship
                            </p>
                          </Col>
                          <Col xs={{ span:1 , offset:4}}>
                            <BsPlus size="22"/>
                          </Col>
                          </Row>
                        </Link>
                      </Col>
                    }
                  </Row>
                { toggleEdit ? 
                  <Row className="mt-4">
                    <Col md="4" xs="12">
                      <Button className={styles.cancel_button} onClick={()=>setToggleEdit(false)} type="submit">
                        Cancel
                      </Button>
                    </Col>
                    <Col md={{span:"3", offset: "5"}} xs="12">
                      <Button className={styles.save_button} onClick={()=>onClickFunc()} type="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                  :
                  <Row className="mt-3">
                    <Col md="2" xs="12">
                      <Button className={styles.save_button} onClick={()=>setToggleEdit(true)} type="submit">
                        Edit Information
                      </Button>
                    </Col>
                  </Row>
                }
              </Col>
            </Row>
          }
        </Col>
      </Row>
    </Container>
	);
};

export default ShipBuilding;
