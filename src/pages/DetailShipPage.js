import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setVesselType, setOneShip, setReadyStockUpdate, resetShipUpdate } from '../store/actions/shipAction'

const DetailShipPage = ({ dispatch, dataShip }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("ship");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(1000);
  const [images, setImages] = useState([]);
  const [buildYear, setBuildYear] = useState(1945);
  const [dwt, setDwt] = useState(1);
  const [loaBreadthDepthInM3, setLoaBreadthDepthInM3] = useState("");
  const [mainEngineModel, setMainEngineModel] = useState("");
  const [auxiliaryEngine, setAuxiliaryEngine] = useState("");
  const [vesselTypes, setVesselTypes] = useState([])
  const { shipId } = useParams()
  const navigate = useNavigate()

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

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  
  const doEditShip = (e) =>{
    e.preventDefault()
    const data = {
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
    setReadyStockUpdate(dispatch, data, shipId)
  }

  useEffect(()=>{
    setOneShip(dispatch, shipId)
    setVesselType(dispatch)
  },[])

  useEffect(()=>{
    if( dataShip.oneReadyStockResp !== null ){
      const data = dataShip.oneReadyStockResp
      const selectedType = vesselTypes.filter(item=>item.id === data.vesselTypeId)
      setSelectedType(selectedType[0])
      setName(data.name)
      setImageUrl(data.imageUrl)
      setPrice(data.price)
      setBuildYear(data.buildYear)
      setDwt(data.dwt)
      setLoaBreadthDepthInM3(data.loaBreadthDepthInM3)
      setMainEngineModel(data.mainEngineModel)
      setAuxiliaryEngine(data.auxiliaryEngine)
      if( dataShip.oneReadyStockResp.imageUrl ){
        const data = {
          data_url: dataShip.oneReadyStockResp.imageUrl,
        }
        setImages([data])
      }
      setIsLoading(false)
    }
  },[dataShip.oneReadyStockResp])

  useEffect(()=>{
    if( dataShip.readyStockUpdateResp !== null ){
      resetShipUpdate(dispatch)
      navigate(-1)
    }
  },[dataShip.readyStockUpdateResp])

  useEffect(()=>{
    if( dataShip.vesselTypeResp.length > 0 ){
      setVesselTypes(dataShip.vesselTypeResp)
    }
  },[dataShip.vesselTypeResp])

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
      value: name,
      action: setName,
      required: true,
    },{
      label: "Price Indication",
      type: "text",
      placeholder: "Rp 1.000.000.000",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: price,
      action: setPrice,
      required: true,
    },{
      label: "Vessel Type",
      type: "dropdown",
      spaceMd: "6",
      spaceXs: "12",
      section: "Facility",
      default: "Select Vessel Type",
      value: selectedType,
      dataDropdown: vesselTypes,
      action: handleSelect,
    },{
      label: "Build Year",
      type: "text",
      placeholder: "Input Build Year",
      spaceMd: "6",
      isNumberOnly: true,
      spaceXs: "12",
      value: buildYear,
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
      spaceMd: "3",
      spaceXs: "3",
      action: backPage,
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

  return (    
    <>
    {isLoading === false &&
      <div className="container_right_form">
        <MainForm
          pageName={"Ready Stock Ship"}
          progress={progress}
          onClickFunc={clicked}
          dataForm={dataForm}
          onSubmit={doEditShip}
        />
      </div>
    }
    </>
  );
};

const storage = state => {
  return {
    dataShip: state.ship
  };
};

export default connect(
  storage
)(DetailShipPage)
