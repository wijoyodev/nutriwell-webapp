import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setDetailBanner, setUpdateBanner, resetUpdateBanner, setDeleteBanner } from '../store/actions/bannerAction'
import Swal from 'sweetalert2';

const BannerDetailPage = ({
  dispatch, 
  dataBanner,
})  =>  {
  const [progress, setProgress] = useState(true);
  const { bannerId } = useParams()
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState(true);
  const [images, setImages] = useState([]);
  const [imagez, setImagez] = useState([]);

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
        navigate('../bannerManagement')
      }
    })
  }

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const onChangeImagez = (e) => {
    // data for submit
    setImagez(e.target.files[0]);
  };

  const doUpdateBanner = (e) => {
    e.preventDefault()
    const data = {
      title,
      description: content,
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
      navigate('../supplierBanner')
    }
  },[dataBanner.bannerUpdateResp])

  useEffect(()=>{
    if( dataBanner.bannerDetailResp ){
      console.log("masuk data banner", dataBanner)
      setTitle(dataBanner.bannerDetailResp.title)
      setId(dataBanner.bannerDetailResp.id)
      setContent(dataBanner.bannerDetailResp.description)
      if( dataBanner.bannerDetailResp.image_url ){
        const data = {
          data_url: dataBanner.bannerDetailResp.image_url,
        }
        // setImages([data])
      }else{
        setImages([])
      }
    }
  },[dataBanner.bannerDetailResp])

  const dataForm = [
    {
      label: "ID",
      type: "text",
      placeholder: "ID",
      spaceMd: "12",
      spaceXs: "12",
      value: id,
      notEditable : true
    },{
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
      label: "Judul Banner",
      type: "text",
      placeholder: "Input Judul Banner",
      spaceMd: "12",
      spaceXs: "12",
      value: title,
      action: setTitle,
      required: true,
    },{
      label: "Isi Banner",
      type: "text",
      placeholder: "Input Link",
      spaceMd: "12",
      spaceXs: "12",
      value: content,
      action: setContent,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Save",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      action: doUpdateBanner,
    },{
      label: "Cancel",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
      link: '../bannerManagement'
    },{
      label: "Delete",
      type: "buttonDelete",
      spaceMd: "3",
      spaceXs: "3",
      onClickAction: doDeleteBanner,
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"Supplier Banner Detail"}
        progress={progress}
        onClickFunc={clicked}
        dataForm={dataForm}
        onSubmit={doUpdateBanner}
        whiteBackground={true}
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
)(BannerDetailPage)  