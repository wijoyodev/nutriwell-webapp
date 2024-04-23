import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import { BiTrashAlt, BiEdit } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import styles from './ShipBuilding.module.scss'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { CiWarning } from 'react-icons/ci'
import Swal from 'sweetalert2'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setShipBuildingDetail, setShipBuildingCreate, resetShipBuildingCreate, setShipBuildingUpdate, resetShipBuildingUpdate } from '../../../store/actions/shipBuildingAction'
import { setVesselType, setShipDelete } from '../../../store/actions/shipAction'

const ShipBuilding = ({
  dispatch, 
  dataShipBuilding,
  dataShip,
  setPosition,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [vesselTypes, setVesselTypes] = useState([])
  const [shipBuildingId, setShipBuildingId] = useState(null)
  const [description, setDescription] = useState(null)
  const [selectedVesselType, setSelectedVesselType] = useState([])
  const [shipPorto, setShipPorto] = useState([])
  const [shipReadyStock, setShipReadyStock] = useState([])
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleDetails, setToggleDetails] = useState(false);
  const [isShipBuilding, setIsShipBuilding] = useState(true)
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate()
  
  const shipyardId = localStorage.getItem('shipyardId')
  const doDeleteShip = (id) => {
    setShipDelete(dispatch, id)
    setTimeout(() => { 
      window.location.reload(false);
    }, 500)
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      doSaveChanges(event)
    }
    setValidated(true);
  };

  const doSaveChanges = (e) => {
    e.preventDefault()
    let data 
    let vesselTypeIds = []
    
    for( let i=0 ; i<vesselTypes.length ; i++ ){
      if( vesselTypes[i].checked === true ){
        vesselTypeIds.push(vesselTypes[i].id)
      }
    }

    if( isShipBuilding === false ){
      data = {
        description,
        vesselTypeIds
      }
      setShipBuildingCreate(dispatch, data, shipyardId) 
    } else {
      data = {
        isShipBuilding: true,
        description,
        vesselTypeIds
      }
      setShipBuildingUpdate(dispatch, data, shipBuildingId)
    }
  }

  const manageVesselType = (allVessel, isShipBuilding) => {
    let allData = []
    if( isShipBuilding==false ){
      for( let i=0 ; i<allVessel.length ; i++ ){
        let oneData = allVessel[i]
        oneData["checked"] = false
        allData.push(oneData)
      }
    } else if( isShipBuilding==true ){
      for( let i=0 ; i<vesselTypes.length ; i++ ){
        let oneData = vesselTypes[i]
        for( let j=0 ; j<allVessel.length ; j++ ){
          if( oneData.id === allVessel[j].id ){
            oneData["checked"] = true
            break;
          }
        }
        if(oneData["checked"] != true){
          oneData["checked"] = false
        }
        allData.push(oneData)
      }
    }
    setVesselTypes(allData)
    setIsLoading(false)
  }

  const vesselTypeChange = (id, value) => {
    let curr = [...vesselTypes]
    for( let i=0 ; i<curr.length ; i++ ){
      if( curr[i].id === id ){
        curr[i].checked = value
      }
    }
    setVesselTypes(curr)
  } 

	useEffect(()=>{
    setVesselType(dispatch)
    setShipBuildingDetail(dispatch, shipyardId)
    
    localStorage.setItem("pagePos","Ship Building")
	},[])
  
  useEffect(()=>{
    if( dataShipBuilding.shipBuildingDetailResp !== null && dataShipBuilding.shipBuildingDetailResp.isShipBuilding === true ){
      let data = dataShipBuilding.shipBuildingDetailResp.shipBuilding
      setShipBuildingId(data.id)
      manageVesselType(data.vesselTypes, true)
      setDescription(data.description)
      setShipPorto(data.portfolioShips)
      setShipReadyStock(data.readyStockShips)
      setIsShipBuilding(true)
      setToggleDetails(true)
    } else if( dataShipBuilding.shipBuildingDetailResp !== null && dataShipBuilding.shipBuildingDetailResp.isShipBuilding === false ){
      setIsShipBuilding(false)
      setToggleDetails(false)
    }
  },[dataShipBuilding.shipBuildingDetailResp])

  useEffect(()=>{
    if( dataShip.vesselTypeResp.length > 0 ){
      manageVesselType(dataShip.vesselTypeResp, false)
    }
  },[dataShip.vesselTypeResp])

  useEffect(()=>{
    if( dataShipBuilding.shipBuildingCreateResp){
      resetShipBuildingCreate(dispatch)
      
    }
  },[dataShipBuilding.shipBuildingCreateResp])

  useEffect(()=>{
    if( dataShipBuilding.shipBuildingUpdateResp ){
      resetShipBuildingUpdate(dispatch)
      navigate('../shipyardOwner')
      localStorage.setItem("pagePos","About")
      setPosition("About")
    }
  },[dataShipBuilding.shipBuildingUpdateResp])
  
  const images = [
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
  ];

  const poupModal = (data) => {
    Swal.fire({
      title: data.title,
      text: data.type,
      imageUrl: data.img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: '#163b55',
      confirmButtonText: 'Ok',
    })
  } 

  useEffect(()=>{
	},[])

	return (
    isLoading === false && 
    <>
      <Container className={styles.container}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className={styles.middle_container}>
            { vesselTypes.length > 0 &&
              <Col xs={12}>
                <Row>
                  <Col md={6} xs={6}>
                    <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Is this a Ship Building Shipyard</Form.Label>
                    <InputGroup>
                      <Form.Check 
                        type="switch"
                        checked={toggleDetails}
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
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            required={true}
                          />
                          <Form.Control.Feedback type="invalid">
                            Description is required
                          </Form.Control.Feedback>
                        </InputGroup>
                      :
                        <>
                          <br/>
                          <Form.Label htmlFor="basic-url" className={styles.field_item}> {description} </Form.Label>
                        </>
                      }
                      
                    </Col>
                    <Col xs={12}>
                      <Form.Label htmlFor="basic-url" className={styles.field_title}>Vessel types</Form.Label>
                      <Row>
                        {toggleEdit ?
                          vesselTypes.map((item,index)=> {
                            return <Col xs={6} key={index}>
                              <InputGroup >
                                <Form.Check
                                  inline
                                  label={item.name}
                                  name={item.name}
                                  checked={item.checked}
                                  onChange={(e)=>vesselTypeChange(item.id, e.target.checked)}
                                  id={item.id}
                                />
                              </InputGroup>
                            </Col>
                          })
                          :
                          vesselTypes.map((item,index)=> {
                            return (
                              item.checked &&
                                <Col xs={6} key={index}>
                                  <Row>
                                    <Col xs={{span:1, offset:1}}>
                                      <AiOutlineCheckCircle/>
                                    </Col>
                                    <Col xs={10}>
                                      {item.name}
                                    </Col>
                                  </Row>
                                </Col> 
                            )
                          })
                        }
                      </Row>
                    </Col>
                    <Col xs={12} className="mt-4">
                      <Row>
                        <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Vessel Portoflio</Form.Label>
                          {shipPorto.map((item,index)=> {
                            return (
                              <Col md={6} xs={6} className={styles.card_wrapper} key={index}>
                                <Row className={styles.card_facility}>
                                  <Col xs="4">
                                    <img height={"100px"} width={"100px"} src={item.imageUrl}/>
                                  </Col>
                                  <Col xs="6">
                                    <Row>
                                      <Col xs="12">
                                        <p className={styles.facility_name}>
                                          {item.name}
                                        </p>
                                      </Col>
                                    </Row>
                                    <p className={styles.description}>
                                      {item.description}
                                    </p>
                                  </Col>
                                  { toggleEdit && 
                                    <Col xs="1" className={styles.delete_icon}>
                                      <Row>
                                        <Link to={`../detailPorto/${item.id}`} className={styles.no_link}>
                                          <BiEdit
                                            color={"#7977a8"} 
                                            size="17"
                                          />
                                        </Link>
                                      </Row>
                                      <Row>
                                        <Col onClick={()=>doDeleteShip(item.id)}>
                                          <BiTrashAlt 
                                            color={"#cd1919"} 
                                            size="17"
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  }
                                </Row>
                              </Col>
                            )
                          })}
                          { toggleEdit && 
                            <>
                              { shipBuildingId ? 
                                  <Col md={6} xs={6} className={styles.card_wrapper_2}>
                                    <Link to={`../addPorto/${shipBuildingId}`} className={styles.button_add_dock}>
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
                                  :
                                  <Col md={6} xs={6} className={styles.card_wrapper_2}>
                                    <Row className={styles.card_facility_2}>
                                      <Col xs="12">
                                        <p className={styles.facility_name}>
                                          Save Ship Building first to add this
                                        &nbsp; <CiWarning color="red"/>
                                        </p>
                                      </Col>
                                    </Row>
                                  </Col>
                              }
                            </>
                          }
                      </Row>
                    </Col>
                    <Col xs={12} className="mt-4">
                      <Row>
                        <Form.Label htmlFor="basic-url" className={styles.field_title_2}>Ready Stock Vessel</Form.Label>
                          {shipReadyStock.map((item,index)=> {
                            return (
                              <Col md={6} xs={6} className={styles.card_wrapper} key={index}>
                                <Row className={styles.card_facility}>
                                  <Col xs="4">
                                    <img height={"100px"} width={"100px"} src={item.imageUrl}/>
                                  </Col>
                                  <Col xs="6">
                                    <Row>
                                      <Col xs="12">
                                        <p className={styles.facility_name}>
                                          {item.name}
                                        </p>
                                        <p className={styles.facility_name}>
                                          {"Rp " + new Intl.NumberFormat('id-ID').format(item.price)}
                                        </p>
                                      </Col>
                                    </Row>
                                    <p className={styles.description}>
                                      {item.buildYear}
                                    </p>
                                  </Col>
                                  { toggleEdit && 
                                    <Col xs="1" className={styles.delete_icon}>
                                      <Row>
                                        <Link to={`../detailShip/${item.id}`} className={styles.no_link}>
                                          <BiEdit
                                            color={"#7977a8"} 
                                            size="17"
                                          />
                                        </Link>
                                      </Row>
                                      <Row>
                                        <Col onClick={()=>doDeleteShip(item.id)}>
                                          <BiTrashAlt 
                                            color={"#cd1919"} 
                                            size="17"
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  }
                                </Row>
                              </Col>
                            )
                        })}
                        { toggleEdit && 
                          <>
                            { shipBuildingId ? 
                              <Col md={6} xs={6} className={styles.card_wrapper_2}>
                                <Link to={`../addShip/${shipBuildingId}`} className={styles.button_add_dock}>
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
                                :
                                <Col md={6} xs={6} className={styles.card_wrapper_2}>
                                  <Row className={styles.card_facility_2}>
                                    <Col xs="12">
                                      <p className={styles.facility_name}>
                                        Save Ship Building first to add this
                                        &nbsp; <CiWarning color="red"/>
                                      </p>
                                    </Col>
                                  </Row>
                                </Col>
                            }
                          </>
                          }
                        </Row>
                      { toggleEdit ? 
                        <Row className="mt-4">
                          <Col md="4" xs="12">
                            {/* <Button className={styles.cancel_button} onClick={()=>window.location.reload(false)} type="submit">
                              Cancel
                            </Button> */}
                          </Col>
                          <Col md={{span:"3", offset: "5"}} xs="12">
                            <Button className={styles.save_button} type="submit">
                              Save
                            </Button>
                          </Col>
                        </Row>
                        :
                        <Row className="mt-3">
                          {/* <Col md="2" xs="12">
                            <Button className={styles.save_button} onClick={()=>setToggleEdit(true)} type="submit">
                              Edit Information
                            </Button>
                          </Col> */}
                        </Row>
                      }
                    </Col>
                  </Row>
                }
              </Col>
            }
          </Row>
        </Form>
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataShipBuilding: state.shipBuilding,
    dataShip: state.ship,
  };
};

export default connect(
  storage
)(ShipBuilding)
