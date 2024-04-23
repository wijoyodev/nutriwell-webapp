import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './ReferenceNetwork.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import ReferenceNetworkTable from "../../Table/MemberDetail/ReferenceNetworkTable";
import { setIslandResp, setAddShipyard, resetAddShipyardResp, setUpdateShipyard, resetUpdateShipyard } from '../../../store/actions/shipyardAction'

const ReferenceNetwork = ({
  pageFor,
  dispatch, 
  dataShipyard,
  setPosition,
  dataOneShipyard,
}) => {
  const { orderId, memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [islands, setIslands] = useState(null)
  const [locations, setLocations] = useState(null)
  const [lvl1, setLvl1] = useState("");
  const [totalRefNetwork, setTotalRefNetwork] = useState("");
  const [images, setImages] = useState("");
  const [validated, setValidated] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [lvl2, setLvl2] = useState("");
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
  
  const navigate = useNavigate()

  const setLocation = () => {
    setIslandResp(dispatch)
  }
  
  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }
  
  const handleSelect = (e, type) => {
    const splitValue = e.target.value.split("||")
    if( type === "Island" ){
      setBankAccountName({
        id: splitValue[0],
        name: splitValue[1],
      }) 
    } else if( type === "Location" ){
      setSelectedLocation({
        id: splitValue[0],
        name: splitValue[1],
      })
    }
  }

  const resetData = () => {
    
  }

  const manageLocation = () => {
    const list = dataShipyard.islandResp.data.islands
    let islands = []
    let location = {}

    for( let i=0 ; i<list.length ; i++ ){
      if( i === 0 ){
        setBankAccountName({
          id: list[i].id,
          name: list[i].name,
        })
      }
      islands.push({
        id: list[i].id,
        name: list[i].name,
      })
      location[list[i].name] = []
      for( let j=0 ; j<list[i].areas.length ; j++ ){
        let area = list[i].areas[j]
        if( i === 0 && j === 0 ){
          setSelectedLocation({
            id: area.id,
            name: area.name,
          })
        }
        location[list[i].name].push({
          id: area.id,
          name: area.name,
        })
      }
    }
    setIslands(islands)
    setLocations(location)
    setIsLoading(false)
  }

  const doDeactive = (e) => {
    e.preventDefault()
    Swal.fire({
      text: "Are you sure want to deactivate this user?",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#a9acaf',
      cancelButtonText: 'No',
      cancelButtonColor: '#163b55',
      showCloseButton: true,
      showCancelButton: true,
    })
  }
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const initImage = (allImages) => {
    let data = []
    for( let i=0 ;i<allImages.length ; i++){
      data.push({data_url: allImages[i].imageUrl})
    }
    setImages(data)
  }

  useEffect(()=>{
    if( dataShipyard.islandResp.data ){
      manageLocation()
    }
  },[dataShipyard.islandResp])

  useEffect(()=>{
    if( dataShipyard.addShipyardResp ){
      // navigate("../shipyardListed");
      resetAddShipyardResp(dispatch)
      setPosition("Dock Facility")
      localStorage.setItem("pagePos","Dock Facility")
    }
  },[dataShipyard.addShipyardResp])

  useEffect(()=>{
    if( dataShipyard.updateShipyardResp ){
      resetUpdateShipyard(dispatch)
      setPosition("Dock Facility")
      localStorage.setItem("pagePos","Dock Facility")
    }
  },[dataShipyard.updateShipyardResp])

  const setData = (data) => {
    setTotalRefNetwork("MEI02")
    setLvl1("10")
    setLvl2("20")
    setLvl3("30")
    setLvl4("40")
    setLvl5("50")
  }

  useEffect(()=>{
    setLocation()

    // testing purpose only
      setData(dataOneShipyard)
  },[])

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  useEffect(()=>{
    setLocation()
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
      { islands !== null && locations !== null &&  <>
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
            <ReferenceNetworkTable/>
          </Row>
        </Container>
      </> }
    </>
	);
};

const storage = state => {
  return {
    dataShipyard: state.shipyard
  };
};

export default connect(
  storage
)(ReferenceNetwork)
