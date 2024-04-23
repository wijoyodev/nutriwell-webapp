import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { setPortoCreate, resetPortoCreate } from '../store/actions/shipAction'

const AddPortoPage = ({ dispatch, dataShip }) => {
  const [progress, setProgress] = useState(true);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  const { shipBuildingId } = useParams()
  
  const doAddPorto = (e) =>{
    e.preventDefault()
    const data = {
      shipBuildingId,
      name,
      imageUrl: images,
      description,
    }
    setPortoCreate(dispatch, data)
  }

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const backPage = () => {
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
      label: "",
      type: "SPACE",
      placeholder: "",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Ship Information *",
      type: "textarea",
      placeholder: "List your ship details. E.g. vessel type, machine type, ship size, etc.",
      spaceMd: "12",
      spaceXs: "12",
      action: setDescription,
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

	useEffect(()=>{
    if( dataShip.portoCreateResp !== null ){
      resetPortoCreate(dispatch)
      navigate(-1)
    }
	},[dataShip.portoCreateResp])

  return (    
    <div class={"container_right_form"}>
      <MainForm
        pageName={"Add Ship Portofolio"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        linkBack={"../shipyard"}
        onSubmit={doAddPorto}
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
)(AddPortoPage)
