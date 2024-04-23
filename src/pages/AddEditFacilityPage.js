import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { setShipyardFacilityUpdate, setOneShipyardFacility, resetOneShipyardFacility, resetUpdateFacilityResponse, setDockingFacilityType, setShipyardFacilityCreate, resetCreateFacilityResponse } from '../store/actions/shipyardFacilityAction'

const AddEditFacilityPage = ({ dispatch, dataFacility  }) => {
  const [progress, setProgress] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [allDockingType, setAllDockingType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [maxDraft, setMaxDraft] = useState("");
  const [maxLightShipWeightInTon, setmaxLightShipWeightInTon] = useState("");
  const [availableFrom, setAvailableFrom] = useState(Math.floor(Date.now() / 1000));
  const [availableUntil, setAvailableUntil] = useState(Math.floor((Date.now() + 86400000) / 1000) ); // 86400000 equal 1 day in ms
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate()
  const shipyardId = localStorage.getItem('shipyardId')
  const { facilityId } = useParams()

  const doAddEditFacility = (e) =>{
    e.preventDefault()
    let data = {
      shipyardId,
      dockingFacilityTypeId: selectedType.id,
      name,
      maxLengthInM: parseInt(maxLength),
      maxWidthInM: parseInt(maxWidth),
      maxDraftInM: parseInt(maxDraft),
      maxLightShipWeightInTon: parseInt(maxLightShipWeightInTon),
      isAvailable,
      availableFrom,
      availableUntil,
    }
    if( facilityId ){
      setShipyardFacilityUpdate(dispatch, data, facilityId)
    }else{
      setShipyardFacilityCreate(dispatch, data)
    }
  }

  const setAvailablity = (from, to) => {
    let dateFrom = Math.floor(new Date(from).getTime() / 1000)
    let dateTo = Math.floor(new Date(to).getTime() / 1000)
    setAvailableFrom(dateFrom)
    setAvailableUntil(dateTo)
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

  const backToPrev = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const dataForm = [
    {
      label: "Facility Type *",
      type: "dropdown",
      dataDropdown: allDockingType,
      spaceMd: "6",
      spaceXs: "12",
      default: "Select Facility Type",
      section: "Facility",
      value: selectedType,
      action: handleSelect,
    },{
      label: "Facility Name",
      type: "text",
      placeholder: "Input Facility Name",
      spaceMd: "6",
      spaceXs: "12",
      value: name,
      action: setName,
      required: true,
    },{
      label: "Max Length (m)",
      type: "text",
      placeholder: "Input Max Length",
      spaceMd: "6",
      spaceXs: "12",
      value: maxLength,
      isNumberOnly: true,
      action: setMaxLength,
      required: true,
    },{
      label: "Max Width (m)",
      type: "text",
      placeholder: "Input Max Width",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: maxWidth,
      action: setMaxWidth,
      required: true,
    },{
      label: "Max Draft (m)",
      type: "text",
      placeholder: "Input Max Draft",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: maxDraft,
      action: setMaxDraft,
      required: true,
    },{
      label: "Max Light Ship Weight (ton)",
      type: "text",
      placeholder: "Input Max Light Ship Weight (ton)",
      spaceMd: "6",
      spaceXs: "12",
      isNumberOnly: true,
      value: maxLightShipWeightInTon,
      action: setmaxLightShipWeightInTon,
      required: true,
    },{
      label: "Availability",
      type: "toggle",
      default: "Select Date",
      spaceMd: "12",
      spaceXs: "12",
      value: isAvailable,
      action: setIsAvailable,
    },{
      label: "Available Until",
      type: "dateRange",
      spaceMd: "6",
      spaceXs: "12",
      default: "Select Date",
      action: setAvailablity,
      availability: isAvailable,
      availableFrom: availableFrom,
      availableUntil: availableUntil,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Back",
      link: "../shipyard",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      action: backToPrev
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
    resetUpdateFacilityResponse(dispatch)
    setDockingFacilityType(dispatch)
    if(facilityId){
      setOneShipyardFacility(dispatch, facilityId)
    }else{
      setName("")
      setMaxLength("")
      setMaxWidth("")
      setMaxDraft("")
      setmaxLightShipWeightInTon("")
    }
  },[])

  useEffect(()=>{
    if( dataFacility.shipyardFacilityUpdateResp && dataFacility.shipyardFacilityUpdateResp.data ){
      resetOneShipyardFacility(dispatch)
    }
  },[dataFacility.shipyardFacilityUpdateResp])

  useEffect(()=>{
    if( dataFacility.oneShipyardFacility && dataFacility.dockingFacilityTypeResp ){
      
      setAllDockingType(dataFacility.dockingFacilityTypeResp)
      const data = dataFacility.oneShipyardFacility
      const selectedType = dataFacility.dockingFacilityTypeResp.filter(item=>item.id === data.dockingFacilityTypeId)
      setSelectedType(selectedType[0])
      setName(data.name)
      setMaxLength(data.maxLengthInM)
      setMaxWidth(data.maxWidthInM)
      setMaxDraft(data.maxDraftInM)
      setmaxLightShipWeightInTon(data.maxLightShipWeightInTon)
      setIsAvailable(data.isAvailable)
      setAvailableFrom(data.availableFrom)
      setAvailableUntil(data.availableUntil)
      setIsLoading(false)
    }
  },[dataFacility.oneShipyardFacility, dataFacility.dockingFacilityTypeResp])

  useEffect(()=>{
    if( dataFacility.dockingFacilityTypeResp && !facilityId){

      const data = dataFacility.dockingFacilityTypeResp
      setAllDockingType(data)
      setSelectedType(data[0]) 
      setIsLoading(false)
    }
  },[dataFacility.dockingFacilityTypeResp])

  useEffect(()=>{
    if( dataFacility.shipyardFacilityCreateResp ){
      // navigate(-1);
      // resetCreateFacilityResponse(dispatch)
    }
  },[dataFacility.shipyardFacilityCreateResp])

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={shipyardId ? "Graving Dock 1" : "Add Docking Facility"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={doAddEditFacility}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataFacility: state.shipyardFacility
  };
};

export default connect(
  storage
)(AddEditFacilityPage)
