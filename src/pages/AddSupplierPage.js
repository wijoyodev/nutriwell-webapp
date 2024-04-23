import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'

const AddSupplierPage = () => {
  const [progress, setProgress] = useState(true);
  const [selectedIsland, setSelectedIsland] = useState("Sumatera");
  const [selectedArea, setSelectedArea] = useState("Batam");
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const handleSelect = (e, type) => {
    const value = e.target.value;
    type === "Island" ? setSelectedIsland(value) : setSelectedArea(value)
  } 

  const dataForm = [
    {
      label: "Company Name *",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Description *",
      type: "textarea",
      placeholder: "Short description about your company",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Supply Category *",
      type: "checklist",
      datas: [{
        label: "Navigation & Communication",
        id: "navigationCommunication"
      },{
        label: "Deck Machinery",
        id: "deckMachinery"
      },{
        label: "Safety",
        id: "safety"
      },{
        label: "Mechanical & Electrical",
        id: "mechanicalElectrical"
      },{
        label: "Tools & Equipment",
        id: "toolsEquipment"
      },{
        label: "Paint & Thinner",
        id: "paintThinner"
      },{
        label: "Consumable",
        id: "consumable"
      },{
        label: "Sparepart",
        id: "parepart"
      },{
        label: "Personal Appliance",
        id: "personalAppliance"
      },{
        label: "Oil & Filter",
        id: "oilFilter"
      },{
        label: "Valve Fitting",
        id: "valveFitting"
      }],
      spaceMd: "12",
      spaceXs: "12",
      spaceMdChild: "6",
    },{
      label: "Supplies *",
      type: "textarea",
      placeholder: "Describe products you offer. e.g. Ship engine spare parts, ship paints, mechanic service, etc.",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Supply Area *",
      type: "checklist",
      datas: [{
        label: "Batam",
        id: "batam",    
      },{
        label: "Bangka Belitung",
        id: "bangkaBelitung",    
      },{
        label: "Lampung",
        id: "lampung",    
      },{
        label: "Aceh",
        id: "aceh",    
      },{
        label: "Sumatera Utara",
        id: "sumateraUtara",    
      },{
        label: "Sumatera Selatan",
        id: "sumateraSelatan",    
      },{
        label: "Riau",
        id: "riau",    
      },{
        label: "Jambi",
        id: "jambi",    
      },{
        label: "Banten",
        id: "banten",    
      },{
        label: "Jawa",
        id: "jawa",    
      },{
        label: "Jawa Tengah",
        id: "jawaTengah",    
      },{
        label: "Jawa Barat",
        id: "jawaBarat",    
      },{
        label: "Jawa Timur",
        id: "jawaTimur",    
      },{
        label: "Kalimantan Barat",
        id: "kalimantanBarat",    
      },{
        label: "Kalimantan Timur",
        id: "kalimantanTimur",    
      },{
        label: "Kalimantan Selatan",
        id: "kalimantanSelatan",    
      },{
        label: "Sulawesi Tenggara",
        id: "sulawesiTenggara",    
      },{
        label: "Sulawesi Utara",
        id: "sulawesiUtara",    
      },{
        label: "Sulawesi Selatan",
        id: "sulawesiSelatan",    
      },{
        label: "Maluku",
        id: "maluku",    
      },{
        label: "Papua Barat",
        id: "papuaBarat",    
      }],
      spaceMd: "12",
      spaceXs: "12",
      spaceMdChild: "6",
    },{
      label: "Address *",
      type: "text",
      placeholder: "Input Company Address",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Contact Name",
      type: "text",
      placeholder: "Input Company Name",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Whatsapp Number *",
      type: "text",
      placeholder: "Input Whatsapp Number",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Company Website",
      type: "text",
      placeholder: "Input Company Website",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Company Facebook",
      type: "text",
      placeholder: "Input Company Facebook",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Company Instagram",
      type: "text",
      placeholder: "Input Company Instagram",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Company LinkedIn",
      type: "text",
      placeholder: "Input Company LinkedIn",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Photo",
      desc: "You can add up to 10 photo",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "12",
      maxImage: "10",
    },
  ]

  return (    
    <>
      <MainForm
        pageName={"Marine Supplier Information"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
      />
    </>
  );
};

export default AddSupplierPage;
