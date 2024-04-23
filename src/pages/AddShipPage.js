import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setVesselType, setReadyStockCreate, resetCreateShipResponse } from '../store/actions/shipAction'

const AddShipPage = ({ dispatch, dataShip }) => {
  const [progress, setProgress] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("ship");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [dwt, setDwt] = useState("");
  const [loaBreadthDepthInM3, setLoaBreadthDepthInM3] = useState("");
  const [mainEngineModel, setMainEngineModel] = useState("");
  const [auxiliaryEngine, setAuxiliaryEngine] = useState("");
  const [vesselTypes, setVesselTypes] = useState([])
  const navigate = useNavigate()
  const { shipBuildingId } = useParams()
  
  const doAddShip = (e) =>{
    e.preventDefault()
    const data = {
      shipBuildingId,
      vesselTypeId: selectedType.id,
      name,
      imageUrl: images,
      price: String(price),
      buildYear: parseInt(buildYear),
      dwt: parseInt(dwt),
      loaBreadthDepthInM3: parseInt(loaBreadthDepthInM3),
      mainEngineModel: mainEngineModel,
      auxiliaryEngine: auxiliaryEngine,
    }
    setReadyStockCreate(dispatch, data)
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }
  
  const handleSelect = (e, type) => {
    const splitValue = e.target.value.split("||")
    if( type === "Facility" ){
      setSelectedType({
        id: splitValue[0],
        name: splitValue[1],
      }) 
    }
  }

  const backPage = () =>{
    navigate(-1)
  }

  const dataForm = [
    {
      label: "",
      desc: "Ship Photo *",
      type: "uploadPhoto",
      spaceMd: "12",
      spaceXs: "12",
      maxImage: "1",
      images: images,
      action: onChangeImage,
    },{
      label: "Ship Name *",
      type: "text",
      placeholder: "Input Ship Name",
      spaceMd: "6",
      spaceXs: "12",
      action: setName,
      required: true,
    },{
      label: "Price Indication",
      type: "text",
      placeholder: "e.g. 1000000000",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      action: setPrice,
      required: true,
    },{
      label: "Vessel Type",
      type: "dropdown",
      dataDropdown: vesselTypes,
      spaceMd: "6",
      spaceXs: "12",
      section: "Facility",
      default: "Select Vessel Type",
      action: handleSelect,
    },{
      label: "Build Year",
      type: "text",
      placeholder: "Input Vessel Year Build",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      action: setBuildYear,
      required: true,
    },{
      label: "Deadweight tonnage (dwt)",
      type: "text",
      placeholder: "Input Ship Deadweight tonnage",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: dwt,
      action: setDwt,
      required: true,
    },{
      label: "LOA Breadth Depth in m3",
      type: "text",
      placeholder: "Input LOA Breadth Depth in m3",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: loaBreadthDepthInM3,
      action: setLoaBreadthDepthInM3,
      required: true,
    },{
      label: "Main Engine Model",
      type: "text",
      placeholder: "Input Main Engine Model",
      spaceMd: "6",
      spaceXs: "12",
      value: mainEngineModel,
      action: setMainEngineModel,
      required: true,
    },{
      label: "Auxiliary Engine",
      type: "text",
      placeholder: "Input Auxiliary Engine",
      spaceMd: "6",
      spaceXs: "12",
      value: auxiliaryEngine,
      action: setAuxiliaryEngine,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Back",
      type: "button_white",
      action: backPage,
      spaceMd: "3",
      spaceXs: "3",
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
    }
  ]

  useEffect(()=>{
    setVesselType(dispatch)
  },[])

  useEffect(()=>{
    if( dataShip.vesselTypeResp.length > 0 ){
      setVesselTypes(dataShip.vesselTypeResp)
      setSelectedType(dataShip.vesselTypeResp[0])
    }
  },[dataShip.vesselTypeResp])

  useEffect(()=>{
    if( dataShip.readyStockCreateResp !== null ){
      navigate(-1);
      resetCreateShipResponse(dispatch)
    }
  },[dataShip.readyStockCreateResp])

  return (    
    <div className="container_right_form">
      <MainForm
        onSubmit={doAddShip}
        pageName={"Add Ready Stock Vessel"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        linkBack={"../shipyard"}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataShip: state.ship
  };
};

export default connect(
  storage
)(AddShipPage)  
