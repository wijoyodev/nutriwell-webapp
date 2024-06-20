import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { setCreateBanner, resetCreateBanner } from '../store/actions/bannerAction'
import Swal from 'sweetalert2';

const NewBannerManagementPage = ({
  dispatch, 
  dataBanner,
})  =>  {
  const [progress, setProgress] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
  },[])

  useEffect(()=>{
    if( dataBanner.bannerCreatetResp ){
      resetCreateBanner(dispatch)
      navigate('../bannerManagement')
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
    let data = {}
    if( images.length === 0 ){
      Swal.fire({
        title: 'Photo required',
        text: "Need to add Photo",
        icon: 'warning',
        confirmButtonColor: '#1b4460',
      })
    }else{
      data = {
        title,
        description: content,
        imageUrl: images
      }
    }
    setCreateBanner(dispatch, data)
  }

  const dataForm = [
    {
      label: "Gambar",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "12",
      maxImage: "1",
      images: images,
      // images: imagez,
      action: onChangeImage,
      // action: onChangeImagez,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      type: "LABEL",
      spaceMd: "12",
      spaceXs: "12",
      label: "Min. Size 1029x423 px"
    },{
      label: "Judul Banner",
      type: "text",
      placeholder: "Masukkan Judul Banner",
      spaceMd: "12",
      spaceXs: "12",
      value: title,
      action: setTitle,
      required: true,
    },{
      label: "Isi Banner",
      type: "textarea",
      placeholder: "Masukkan Isi Banner",
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
      label: "Simpan",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      action: doCreateBanner,
    },{
      label: "Cancel",
      type: "buttonWhite",
      spaceMd: "3",
      spaceXs: "3",
      link: '../bannerManagement'
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
)(NewBannerManagementPage)  
