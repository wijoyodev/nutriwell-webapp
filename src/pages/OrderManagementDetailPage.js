import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setUploadFile, resetUploadFile, setDetailShipyard, resetDetailShipyard, setAllShipyardByShipyardId, setUpdateDetailShipyard } from '../store/actions/shipyardAction'
import { setActiveDeactive } from '../store/actions/loginRegisterAction'
import { setDetailOrder } from '../store/actions/orderAction'

const OrderManagementDetailPage = ({ dispatch, dataOrder }) => {
  const { orderId } = useParams()

  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionTotal, setTrasactionTotal] = useState(null);
  const [transactionSubTotal, setTrasactionSubTotal] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  // const [isVerified, setIsVerified] = useState(null);
  
  const [details, setDetails] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [requestDate, setRequestDate] = useState("");  
  const [receivedDate, setReceivedDate] = useState("");

  // bank info
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");

  // payment info
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  
  // shipping info
  const [isOnShipping, setIsOnShipping] = useState(false);
  const [courierType, setCourierType] = useState("");
  const [courierPrice, setCourierPrice] = useState("");

  const [productDetails, setProductDetails] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [reason, setReason] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [status, setStatus] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [shippingNo, setShippingNo] = useState("");
  const [shippingDate, setShippingDate] = useState("");

  const navigate = useNavigate()

  const doUpdate = (e) => {
    e.preventDefault()
    const dataUpdate = {
      name,
      bankNumber,
      bankAccountName,
      status,
      transactionDate,
      productDetails: productDetails,
      transactionNumber: transactionNumber,
      reason: reason,
      customerDetail: customerDetail,
    }
    setUpdateDetailShipyard(dispatch, dataUpdate, id)
  }

  const triggerUpload = (e, section) => {
    setUploadFile(dispatch, e.target.files[0], section)
  }

  const packageDetail = () => {
    Swal.fire({
      title: 'Ubah Status',
      html: `
        <label for="cars">Kurir</label>
        <br/>
        <select name="cars" id="swal2-select" class="swal2-select">
          <option value="jne">JNE</option>
          <option value="jnt">JNT</option>
          <option value="tiki">TIKI</option>
          <option value="gojek">Gojek</option>
        </select>

        <br/>
        <label for="cars">Nomr Resi</label>
        <input id="swal-input2" class="swal2-input" placeholder="Masukkan nomor Resi"/>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal2-select").value,
          document.getElementById("swal-input2").value
        ];
      }
    })
  }

  const reasonCancel = async () => {
    const { value: ipAddress } = await Swal.fire({
      title: "Alasan",
      inputPlaceholder: "Masukkan alasan",
      input: "text",
      inputLabel: "Your IP address",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
    });
    if (ipAddress) {
      Swal.fire(`Your IP address is ${ipAddress}`);
    }
  }

  const changeStatus = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Ubah Status',
      input: "select",
      text: "Status",
      inputOptions: {
        notPaid: "Belum Bayar",
        packaged:  "Dikemas",
        delivered: "Dikirim",
        done: "Selesai",
        cancelled: "Dibatalkan",
      },
      inputPlaceholder: "Select Status",
      confirmButtonColor: '#0975B6',
      confirmButtonText: "Simpan",
      showCancelButton: true,
      cancelButtonColor: "grey",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "delivered") {
            packageDetail()
          } else if (value === "cancelled") {
            reasonCancel();
          } else {
            Swal.fire({
              title: 'Sukses',
              text: "Mengganti status",
              icon: 'success',
              confirmButtonColor: '#0975B6',
            })
          }
        });
      }
    })
  }

  useEffect(()=>{
    if( dataOrder.orderDetailResp ){
      console.log(dataOrder.orderDetailResp, "< dataOrder.orderDetailResp")
      let data = dataOrder.orderDetailResp
      setId(data.order_number)
      setName(data.user_detail.full_name)
      setRequestDate(data.created_at)
      
      setBankName(data.user_detail.account_bank)
      setBankNumber(data.user_detail.account_bank_number)
      setBankAccountName(data.user_detail.account_bank_name)

      if(data.status === 2 || data.status === 3){
        setShippingNo(data.shipment_number)
        setShippingDate(data.delivery_date)
        setIsOnShipping(true)
      }

      if(data.status === 1 || data.status === 2 || data.status === 3){
        setPaymentMethod(data.payment_method)
        setPaymentDate(data.payment_date)
        setIsPaymentDone(true)
      }

      if(data.status === 3){
        setReceivedDate(data.receive_date)
      }

      setCourierType(data.courier_name)
      setCourierPrice(data.courier_rate)
      setProductDetails(data.product_detail)
      setTransactionNumber(data.order_number)
      setReason(data.reason)
      setCustomerDetail(data.user_detail)
      setStatus(data.status)
      setTransactionDate(data.created_at)
      setIsVerified(data.account)
      setTrasactionTotal(data.total_purchase)
      setTrasactionSubTotal(data.product_detail.total_price)
      setIsLoading(false)
    }
  },[dataOrder.orderDetailResp])

  useEffect(()=>{
    if( dataOrder.uploadFileResp ){
      switch (dataOrder.uploadFileResp.section) {
        case "productDetails" :
          setProductDetails(dataOrder.uploadFileResp.url)
          break;
        case "transactionNumber" :
          setTransactionNumber(dataOrder.uploadFileResp.url)
          break;
        case "reason" :
          setReason(dataOrder.uploadFileResp.url)
          break;
        case "customerDetail" :
          setCustomerDetail(dataOrder.uploadFileResp.url)
          break;
        default :
          setProductDetails(dataOrder.uploadFileResp.url)
          break;
      } 
      resetUploadFile(dispatch)
    }
  },[dataOrder.uploadFileResp])

  useEffect(()=>{
    setDetailOrder(dispatch, orderId)
    setIsLoading(true)

    // FOR SLICING DATA ONLY 
    // setId("ODO00001")
    // setName("PT Bumi Makmur")
    // setRequestDate("oke")
    // setBankName("BCA")
    // setBankNumber("5082172373")
    // setBankAccountName("Samsul Saripudin")
    // setProductDetail([{
    //   description: "Request PEnarikan",
    //   total: 1500000,
    // }])
    // setTransactionNumber("973528139")
    // setReason("oke")
    // setCustomerDetail({
    //   name: "John Doe",
    //   phone: "085712381238",
    //   address: "Ruko Prominence, Jl. Jalur Sutera Boulevard No.2, Kab Tangerang, Banten, ID 12345",
    //   paymentMethod: "Transfer Bank",
    //   shippingMethod: "JNE Regular",
    //   trasactionDate: 1709910356,
    //   shippingNo: "032483294203942",
    //   shippingDate: 1709910356,
    // })
    // setStatus("Selesai")
    // setTransactionDate(1709743549)
    // setIsVerified("oke")
    // setTrasactionTotal({
    //   subTotal: 150000,
    //   shippingPrice: 3000,
    //   totalPrice: 153000,
    // })
    // FOR SLICING DATA ONLY

  },[])

  const dataForm = [
    {
      label: "Informasi Order",
      type: "section",
      dataFields: [
        {
          label: "ORDER ID",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: id,
        },{
          label: "CUSTOMER",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: name,
        },{
          label: "NOMOR PESANAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: transactionNumber,
        },{
          label: "WAKTU PESANAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          value: transactionDate,
        }
      ]
    },
    {
      label: "Informasi Customer",
      type: "section",
      dataFields: [
        {
          label: "PENERIMA",
          type: "textCustomer",
          spaceMd: "12",
          spaceXs: "12",
          value: customerDetail,
        },{
          label: "METODE PEMBAYARAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          isPaymentDone: isPaymentDone,
          paymentMethod: paymentMethod,
          detailInfo: paymentDate,
        },{
          label: "METODE PENGIRIMAN",
          type: "text",
          spaceMd: "6",
          spaceXs: "12",
          isOnShipping: isOnShipping,
          courierType: courierType,
          detailInfo: customerDetail,
          shippingNo: shippingNo,
          shippingDate: shippingDate,
        }
      ]
    },
    {
      label: "Informasi Pesanan",
      type: "sectionTable",
      productDetails: productDetails, 
      dataFieldsTitle: ["Deskripsi", "Jumlah"], 
      transactionTotal: transactionTotal,
      transactionSubTotal: transactionSubTotal,
      transactionTotalTitle: ["Subtotal", "Ongkir", "Total"], 
      courierPrice: courierPrice,
    },
    {
      label: "Ubah Status",
      type: "button_submit",
      spaceMd: "3", 
      spaceXs: "3",
      action: changeStatus,
      link: "../accountReview"
    },{
      type: "SPACE",
      spaceMd: "12",
      spaceXs: "12",
    }
  ]

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Order Detail"}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        details={details}
        status={status}
        orderId={id}
        pageFor={"detail"}
        isVerified={isVerified}
        requestDate={requestDate}
        onSubmit={doUpdate}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataOrder: state.order,
  };
};

export default connect(
  storage
)(OrderManagementDetailPage)
