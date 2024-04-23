import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setOnePorto, setPortoUpdate, resetPortoUpdate } from '../store/actions/shipAction'

const DetailPortoPage = ({ dispatch, dataShip }) => {
  const [progress, setProgress] = useState(true);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const { portoId } = useParams()
  const navigate = useNavigate()

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const backPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  
  const doEditPorto = (e) =>{
    e.preventDefault()
    const data = {
      name,
      imageUrl: images,
      description,
    }
    setPortoUpdate(dispatch, data, portoId)
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

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
    },{
      label: "",
      type: "SPACE",
      placeholder: "",
      spaceMd: "6",
      spaceXs: "12",
    },{
      label: "Ship Information *",
      type: "text",
      placeholder: "List your ship details. E.g. vessel type, machine type, ship size, etc.",
      spaceMd: "12",
      spaceXs: "12",
      value: description,
      action: setDescription,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Back",
      action: backPage,
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Save",
      type: "button",
      spaceMd: "3",
      spaceXs: "3",
      action: doEditPorto,
    }
  ]

  useEffect(()=>{
    setOnePorto(dispatch, portoId)
  },[])

  useEffect(()=>{
    if( dataShip.onePortoResp !== null ){
      setName(dataShip.onePortoResp.name)
      setDescription(dataShip.onePortoResp.description)
      if( dataShip.onePortoResp.imageUrl ){
        const data = {
          data_url: dataShip.onePortoResp.imageUrl,
        }
        setImages([data])
      }else{
        setImages([])
      }
      setIsLoading(false)
    }
  },[dataShip.onePortoResp])

  useEffect(()=>{
    if( dataShip.portoUpdateResp !== null ){
      resetPortoUpdate(dispatch)
      navigate(-1)
    }
  },[dataShip.portoUpdateResp])

  return (    
    <>
      { isLoading === false &&
        <div className="container_right_form">
          <MainForm
            pageName={"Add Ship Portofolio"}
            progress={progress}
            onClickFunc={clicked}
            dataForm={dataForm}
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
)(DetailPortoPage)
