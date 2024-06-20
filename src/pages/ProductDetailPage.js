import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { setProductDetail, setUpdateProduct } from '../store/actions/productAction'
import { Container } from 'react-bootstrap';

const ProductDetailPage = ({ dispatch, dataProduct }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [pricing, setPricing] = useState("");
  const [images, setImages] = useState("");
  const navigate = useNavigate()
	
  const doEditProductDetail = (e) => {
    e.preventDefault()
    let dataEdit = {}
    if( images.length === 9 ){
      Swal.fire({
        title: 'Photo required',
        text: "Need to add Photo",
        icon: 'warning',
        confirmButtonColor: '#1b4460',
      })
    }else{
      if( images[0].file ){
        dataEdit = {
          product_name: name,
          description: desc,
          imagesUrl: images,
          price: pricing,
        }
        console.log("if( images[0].file ){",  dataEdit)
      }else{
        dataEdit = {
          product_name: name,
          description: desc,
          price: pricing,
          }
        console.log("}else{", dataEdit)
      }
      setUpdateProduct(dispatch, dataEdit, id)
    }
  }
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
    console.log(imageList, "<<<")
  };

  const setImageShow = (images) => {
    let result = []
    for( let i = 0 ; i<images.length ; i++ ){
      result.push({
        "data_url": images[i]
      })
    }
    setImages(result)
  }

  useEffect(()=>{
    setProductDetail(dispatch)
  },[])

  useEffect(()=>{
    if( dataProduct.productDetailResp ){
      console.log(dataProduct.productDetailResp,"<<dataProduct.productDetailResp")
      setName(dataProduct.productDetailResp.product_name)
      setPricing(dataProduct.productDetailResp.price)
      setDesc(dataProduct.productDetailResp.description)
      setId(dataProduct.productDetailResp.id)
      setImageShow(dataProduct.productDetailResp.product_images)
    }
  },[dataProduct.productDetailResp])

  useEffect(()=>{
    if( dataProduct.productEditResp ){
      console.log( "dataProduct.productEditResp" , dataProduct.productEditResp )
      Swal.fire({
        title: 'Success',
        text: "Product Information Updated",
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
    }
  },[dataProduct.productEditResp])

  const dataForm = [
    {
      label: "Product Detail",
      type: "Title",
      spaceMd: "6",
      spaceXs: "6",
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Gambar",
      type: "uploadPhoto",
      desc: "Anda dapat mengupload maksimal 8 gambar dengan min. size 1029x1029 px",
      spaceMd: "12",
      spaceXs: "12",
      maxImage: "8",
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
      value: name,
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
      value: desc,
      required: true,
      action: setDesc,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    },{
      label: "Harga (Rp)",
      type: "text",
      value: pricing,
      placeholder: "Input Harga (Rp)",
      spaceMd: "6",
      spaceXs: "162",
      required: true,
      action: setPricing,
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
      action: doEditProductDetail,
      link: "../accountReview"
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
    }
  ]

  return (    
    <div className="container_right_form">
      <Container className={"container_product"}>
        <MainForm
          pageName={"Product Detail"}
          dataForm={dataForm}
          linkAccReview={"../accountReview"}
          onSubmit={doEditProductDetail}
        />
      </Container>
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
