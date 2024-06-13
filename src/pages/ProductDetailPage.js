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
  const [id, setId] = useState("");
  const [pricing, setPricing] = useState("");
  const [images, setImages] = useState("");
  const navigate = useNavigate()
	
  const doEditProductDetail = (e) => {
    e.preventDefault()
    let dataEdit = {}
    if( images.length === 0 ){
      Swal.fire({
        title: 'Photo required',
        text: "Need to add Photo",
        icon: 'warning',
        confirmButtonColor: '#1b4460',
      })
    }else{
      if( images[0].file ){
        dataEdit = {
          name,
          desc,
          images,
        }
      }else{
        dataEdit = {
          name,
          desc,
        }
      }
      setUpdateProduct(dispatch, dataEdit, id)
    }
  }
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

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
      label: "Gambar",
      type: "uploadPhoto",
      desc: "Anda dapat mengupload maksimal 8 gambar dengan min. size 1029x1029 px",
      spaceMd: "6",
      spaceXs: "6",
      maxImage: "1",
      images: images,
      action: onChangeImage,
      multiplePhoto: true,
      required: true,
    },{
      type: "SPACE",
      spaceMd: "6",
      spaceXs: "6",
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
      label: "Harga",
      type: "text",
      value: pricing,
      placeholder: "Input Harga",
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
