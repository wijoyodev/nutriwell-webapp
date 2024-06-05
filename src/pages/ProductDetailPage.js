import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { setProductDetail, setUpdateProduct } from '../store/actions/productAction'

const ProductDetailPage = ({ dispatch, dataProduct }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState("");
  const navigate = useNavigate()
	
  const doEditProductDetail = (e) => {
    e.preventDefault()
    const dataEdit = {
      name,
      desc,
      images,
    }
    setUpdateProduct(dispatch, dataEdit)
  }
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  useEffect(()=>{
    setProductDetail(dispatch)
  },[])

  useEffect(()=>{
    if( dataProduct.productDetailResp ){
      // navigate("../produc")
    }
  },[dataProduct.productDetailResp])

  useEffect(()=>{
    if( dataProduct.productEditResp ){
      // navigate("../produc")
    }
  },[dataProduct.productEditResp])

  const dataForm = [
    {
      label: "Gambar",
      type: "uploadPhoto",
      spaceMd: "6",
      spaceXs: "6",
      maxImage: "1",
      images: images,
      action: onChangeImage,
      multiplePhoto: true,
      required: true,
    },{
      label: "Nama",
      type: "text",
      placeholder: "Input Nama",
      spaceMd: "6",
      spaceXs: "6",
      required: true,
      action: setName,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Deskripsi",
      type: "text",
      placeholder: "Input Deskripsi",
      spaceMd: "6",
      spaceXs: "6",
      required: true,
      action: setDesc,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Harga",
      type: "text",
      placeholder: "Input Harga",
      spaceMd: "6",
      spaceXs: "162",
      required: true,
      action: setName,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    },{
      label: "Simpan",
      type: "button_submit",
      spaceMd: "3",
      spaceXs: "3",
      link: "../accountReview"
    },{
      label: "Batal",
      type: "button_white",
      spaceMd: "3",
      spaceXs: "3",
      link: "../productDetail"
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    }
  ]

  return (    
    <div className="container_right_form">
      <MainForm
        pageName={"Product Detail"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        onSubmit={doEditProductDetail}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataProduct: state.product,
  };
};

export default connect(
  storage
)(ProductDetailPage)
