import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'

const NewFAQPage = ()  =>  {
  const [progress, setProgress] = useState(true);

  useEffect(()=>{
  },[])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const dataForm = [
    {
      label: "FAQ Title",
      type: "text",
      placeholder: "Input FAQ Title",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Description",
      type: "textarea",
      placeholder: "Input Description",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "",
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Save",
      type: "buttonBlue",
      spaceMd: "4",
      spaceXs: "4",
    },{
      label: "Cancel",
      type: "buttonWhite",
      spaceMd: "4",
      spaceXs: "4",
    }
  ]

  return (    
    <div className="container_right_form vh-100">
      <MainForm
        pageName={"New Frequently Asked Questions"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
      />
    </div>
  );
};

export default NewFAQPage;
