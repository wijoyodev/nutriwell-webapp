import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import MainForm from '../components/MainForm/MainForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import { setDetailOrder, setChangeOrderStatus, setTrackShipment } from '../store/actions/orderAction'

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

  const reqChangeStat = (orderStatus, dataReq) => {
    // order status
    // Belum Bayar = 0 
    // Dikemas = 1
    // Dikirim = 2
    // Selesai = 3
    // Dibatalkan 4

    let dataParam = {
      "status": orderStatus,
      // "delivery_date": "Fri Apr 25 2024 19:50:58 GMT+0700",
      // "receive_date": "Fri Apr 26 2024 19:50:58 GMT+0700",
      // "payment_date": "Fri Apr 24 2024 19:50:58 GMT+0700",
      // "shipment_number": "asdas42112ada",
      // "payment_method": "BANK_TRANSFER",
      // "external_id": "ada2323esfdsokro34"
    }
    if( orderStatus === 1 ){
      dataParam["payment_date"] = new Date()
    }else if( orderStatus === 2 ){
      dataParam["shipment_number"] = dataReq.shipment_number
      dataParam["delivery_date"] = new Date()
    }else if( orderStatus === 3 ){
      dataParam["receive_date"] = new Date()
    }else if( orderStatus === 4 ){
      dataParam["reasons"] = dataReq.reason
    }
    setChangeOrderStatus(dispatch, orderId, dataParam)
  }

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
    // setUpdateDetailShipyard(dispatch, dataUpdate, id)
  }

  const packageDetail = () => {
    Swal.fire({
      title: 'Ubah Status',
      html: `
        <label for="cars">Kurir</label>
        <br/>
        <select name="cars" id="courier" class="courier">
          <option value="jne">JNE</option>
          <option value="jnt">JNT</option>
          <option value="tiki">TIKI</option>
          <option value="gojek">Gojek</option>
        </select>

        <br/>
        <label for="cars">Nomor Resi</label>
        <input id="ship_number" class="ship_number" placeholder="Masukkan nomor Resi"/>
      `,
      focusConfirm: false,
      preConfirm: () => {
        let courier = document.getElementById("courier").value;
        let ship_number = document.getElementById("ship_number").value;
        
        console.log("VALUE PAKET", courier, ship_number)
        if (!courier || !ship_number) {
          Swal.fire({
            title: 'Warning',
            text: "You need to Choose Shipment Courier and Tracking Number",
            icon: 'warning',
            confirmButtonColor: '#0975B6',
          })
        }else{
          reqChangeStat(2, {shipment_number: ship_number})
        }
        // return [
        //   document.getElementById("swal2-select").value,
        //   document.getElementById("swal-input2").value
        // ];
      },
      inputValidator: (value) => {
        // console.log("VALUE PAKET", value)
        // if (!value) {
        //   return "You need to Choose Shipment Courier and Tracking Number";
        // }else{
        //   reqChangeStat(2, {shipment_number: value})
        // }
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
          return "You need to write something";
        }else{
          reqChangeStat(4, {reason: value})
        }
      }
    });
  }

  const trackShipment = (e, shipNum) =>{
    e.preventDefault()
    setTrackShipment(dispatch, shipNum)
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
          if(value === "notPaid") {
            reqChangeStat(0)
          } else if(value === "packaged") {
            reqChangeStat(1)
          } else if (value === "delivered") {
            packageDetail()
          } else if (value === "done") {
            reqChangeStat(3)
          } else if( value === "cancelled" ){
            reasonCancel();
          }
        });
      }
    })
  }
  
  useEffect(()=>{ 
    if( dataOrder.trackShipmentResp ){
      console.log(dataOrder.trackShipmentResp, "<<di useeffect trackShipmentResp`")
      Swal.fire({
        title: 'Shipment' + dataOrder.trackShipmentResp   ,
        text: dataOrder.trackShipmentResp,
        icon: 'success',
        confirmButtonColor: '#1b4460',
      })
    }
  },[dataOrder.trackShipmentResp])
  
  useEffect(()=>{ 
    if( dataOrder.changeOrderStatusResp ){
      console.log(dataOrder.changeOrderStatusResp, "<<di useeffect changeOrderStatusResp")
      Swal.fire({
        title: 'Sukses',
        text: "Mengganti status",
        icon: 'success',
        confirmButtonColor: '#0975B6',
      })
    }
  },[dataOrder.changeOrderStatusResp])

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
    setDetailOrder(dispatch, orderId)
    setIsLoading(true)
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
      isProductInfo: true,
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
      action: changeStatus ,
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
        trackShipment={trackShipment}
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
