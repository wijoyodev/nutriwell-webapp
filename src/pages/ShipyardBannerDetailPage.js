import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setDetailBanner, setUpdateBanner, resetUpdateBanner, setDeleteBanner } from '../store/actions/bannerAction'
import Swal from 'sweetalert2';

const ShipyardBannerDetailPage = ({
  dispatch, 
  dataBanner,
})  =>  {
  const [progress, setProgress] = useState(true);
  const { bannerId } = useParams()
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState(true);
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  const clicked = () => {
    const temp = !progress
    setProgress(temp)
  }

  const doDeleteBanner = (e) => {
    e.preventDefault()
    Swal.fire({
      title: title,
      text: "Are you sure want to delete this Banner?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#f90030',
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteBanner(dispatch, bannerId)
        navigate('../shipyardBanner')
      }
    })
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const doUpdateBanner = (e) => {
    e.preventDefault()
    const data = {
      title,
      linkUrl,
      imageUrl: images
    }
    setUpdateBanner(dispatch, bannerId, data)
  }

  useEffect(()=>{
    setDetailBanner(dispatch, bannerId)
  },[])

  useEffect(()=>{
    if( dataBanner.bannerUpdateResp ){
      resetUpdateBanner(dispatch)
      navigate('../shipyardBanner')
    }
  },[dataBanner.bannerUpdateResp])

  useEffect(()=>{
    if( dataBanner.bannerDetailResp ){
      setTitle(dataBanner.bannerDetailResp.title)
      setLinkUrl(dataBanner.bannerDetailResp.linkUrl)
      if( dataBanner.bannerDetailResp.imageUrl ){
        const data = {
          data_url: dataBanner.bannerDetailResp.imageUrl,
        }
        setImages([data])
      }else{
        setImages([])
      }
    }
  },[dataBanner.bannerDetailResp])

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
      placeholder: "Input Link",
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
    },{
      label: "Delete",
      type: "buttonDelete",
      spaceMd: "4",
      spaceXs: "4",
      onClickAction: doDeleteBanner,
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"Shipyard Banner Detail"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={doUpdateBanner}
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
)(ShipyardBannerDetailPage)  