import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { setCreateBanner, resetCreateBanner } from '../store/actions/bannerAction'

const NewShipyardBannerPage = ({
  dispatch, 
  dataBanner,
})  =>  {
  const [progress, setProgress] = useState(true);
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
  },[])

  useEffect(()=>{
    if( dataBanner.bannerCreatetResp ){
      resetCreateBanner(dispatch)
      navigate('../shipyardBanner')
    }
  },[dataBanner.bannerCreatetResp])

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const doCreateBanner = (e) => {
    e.preventDefault()
    const data = {
      bannerType: "shipyard",
      title,
      linkUrl,
      imageUrl: images
   }
    setCreateBanner(dispatch, data)
  }

  const dataForm = [
    {
      label: "Banner Image",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "12",
      maxImage: "1",
      images: images,
      action: onChangeImage,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Banner Title",
      type: "text",
      placeholder: "Input Banner Title",
      spaceMd: "6",
      spaceXs: "6",
      value: title,
      action: setTitle,
      required: true,
    },{
      label: "Add Link",
      type: "text",
      placeholder: "eg: https://link.com/",
      spaceMd: "6",
      spaceXs: "6",
      value: linkUrl,
      action: setLinkUrl,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "4",
      spaceXs: "4",
    },{
      label: "Cancel",
      type: "buttonWhite",
      spaceMd: "4",
      spaceXs: "4",
      link: '../shipyardBanner'
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"New Contactor Banner"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={doCreateBanner}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataBanner: state.banner
  };
};

export default connect(
  storage
)(NewShipyardBannerPage)  
