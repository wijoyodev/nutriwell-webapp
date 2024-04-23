import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'

const EditFacilityPage = () => {
  const [progress, setProgress] = useState(true);

  useEffect(()=>{
  },[])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const dataForm = [
    {
      label: "Availability",
      type: "toggle",
      default: "Select Date",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Next Availability",
      type: "dateRange",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Information",
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Facility Type *",
      type: "dropdown",
      dataDropdown: ["Graving Dock", "Floating Dock"],
      spaceMd: "6",
      spaceXs: "12",
      default: "Select Facility Type"
    },{
      label: "Facility Name",
      type: "text",
      placeholder: "Input Facility Name",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Max Length (m)",
      type: "text",
      placeholder: "Input Max Length",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Max Width (m)",
      type: "text",
      placeholder: "Input Max Width",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Max Draft (m)",
      type: "text",
      placeholder: "Input Max Draft",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Max Light Ship Weight (ton)",
      type: "text",
      placeholder: "Input Max Light Ship Weight (ton)",
      spaceMd: "6",
      spaceXs: "12",
    },
  ]

  return (    
    <>
      <MainForm
        pageName={"Edit Facility / name facility"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
      />
    </>
  );
};

export default EditFacilityPage;
