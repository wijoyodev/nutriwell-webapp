import React, { useEffect, useState } from "react";
import MainForm from '../components/MainForm/MainForm'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { setDetailOrder, setChangeOrderStatus, setTrackShipment, resetTrackShipment } from '../store/actions/orderAction'

const OrderManagementDetailPage = ({ dispatch, dataOrder }) => {
  const { orderId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [requestDate, setRequestDate] = useState("");  
  const [reason, setReason] = useState("");  
  const [receivedDate, setReceivedDate] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [status, setStatus] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // payment info
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  
  // shipping info
  const [isOnShipping, setIsOnShipping] = useState(false);
  const [courierType, setCourierType] = useState("");
  const [courierPrice, setCourierPrice] = useState("");
  const [shippingNo, setShippingNo] = useState("");
  const [externalId, setExternalId] = useState("");
  const [shippingDate, setShippingDate] = useState("");

  // price info
  
  const [transactionTotal, setTrasactionTotal] = useState(null);
  const [transactionSubTotal, setTrasactionSubTotal] = useState(null);
  const [itemSubTotal, setItemSubTotal] = useState(null);
  const [productDetails, setProductDetails] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [ppn, setPpn] = useState("");

  const reqChangeStat = (orderStatus, dataReq) => {
    let dataParam = {
      "status": orderStatus,
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
      },
      inputValidator: (value) => {
        // if (!value) {
        //   return "You need to Choose Shipment Courier and Tracking Number";
        // }else{
        //   reqChangeStat(2, {shipment_number: value})
        // }
      }
    })
  }

  const reasonCancel = async () => {
    await Swal.fire({
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

  const printTracking = (data) => {
    let textHistory = ''
    textHistory += `
      <table class="table table-sm table-st">
        <tr>
          <td> Ekspedisi </td>
          <td> ${data.company || ""} </td>
        </tr>
        <tr>
          <td> Type Pengiriman </td>
          <td> ${data.type || ""} </td>
        </tr>
        <tr>
          <td> Nama Kurir </td>
          <td> ${data.driver_name || ""} </td>
        </tr>
        <tr>
          <td> No Resi </td>
          <td> ${data.waybill_id || ""} </td>
        </tr>
        <tr>
          <td> Status Terakhir </td>
          <td> ${data.history[data.history.length-1].status|| ""} </td>
        </tr>
        <tr>
          <td> Waktu Update Terakhir </td>
          <td> ${dateFormat(data.history[data.history.length-1].updated_at, " dS mmmm, yyyy, h:MM:ss") || ""} </td>
        </tr>
        <tr>
          <td> Notes </td>
          <td> ${data.history[data.history.length-1].note} </td>
        </tr>
      </table>
    `
    return textHistory
  }
  
  useEffect(()=>{ 
    if( dataOrder.trackShipmentResp ){
      Swal.fire({
        title: 'Lacak Pengiriman',
        html: printTracking(dataOrder.trackShipmentResp),
        confirmButtonColor: '#1b4460',
      })
      resetTrackShipment(dispatch)
    }
  },[dataOrder.trackShipmentResp, dispatch])
  
  useEffect(()=>{
    if( dataOrder.orderDetailResp ){
      let data = dataOrder.orderDetailResp
      setId(data.order_number)
      setName(data.user_detail.full_name)
      setRequestDate(data.created_at)
      

      if(data.status === 2 || data.status === 3){
        setShippingNo(data.shipment_number)
        setShippingDate(data.delivery_date)
        setIsOnShipping(true)
        setExternalId(data.external_id)
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
      setCustomerDetail(data.user_detail)
      setStatus(data.status)
      setTransactionDate(data.created_at)
      setIsVerified(data.account)
      setTrasactionTotal(data.total_purchase)
      setTrasactionSubTotal(data.product_detail.total_price)
      setIsLoading(false)
    }
  },[dataOrder.orderDetailResp, dispatch])

  useEffect(()=>{
    setDetailOrder(dispatch, orderId)
    setIsLoading(true)
  },[dispatch, orderId])

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
        },{
          label: "ALASAN",
          type: "reason",
          showReason: orderStatus === 4 ? true : false,
          spaceMd: "6",
          spaceXs: "12",
          value: `Dibatalkan sistem (${reason})`,
        },{
          label: "INVOICE",
          type: "invoice",
          showInvoice: (orderStatus === 1 || orderStatus === 2 || orderStatus === 3) ? true : false,
          spaceMd: "6",
          spaceXs: "12",
          value: id,
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
          externalId: externalId,
          shippingDate: shippingDate,
          receivedDate: receivedDate,
        }
      ]
    },
    {
      label: "Informasi Pesanan",
      type: "sectionTable",
      isProductInfo: true,
      productDetails: productDetails, 
      dataFieldsTitle: ["Deskripsi", "QTY", "Harga Per Produk"], 
      transactionTotal: transactionTotal,
      itemSubTotal: itemSubTotal,
      transactionSubTotal: transactionSubTotal,
      ppn: ppn,
      transactionTotalTitle: ["Subtotal", "PPN (11%)", "Ongkir", "Total"], 
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
  
  useEffect(()=>{ 
    if( dataOrder.trackShipmentResp ){
      Swal.fire({
        title: 'Lacak Pengiriman',
        html: printTracking(dataOrder.trackShipmentResp),
        confirmButtonColor: '#1b4460',
      })
      resetTrackShipment(dispatch)
    }
  },[dataOrder.trackShipmentResp, dispatch])
  
  useEffect(()=>{
    if( dataOrder.orderDetailResp ){
      let data = dataOrder.orderDetailResp
      setId(data.order_number)
      setName(data.user_detail.full_name)
      setRequestDate(data.created_at)
      setOrderStatus(data.status)

      if(data.status === 2 || data.status === 3){
        setShippingNo(data.shipment_number)
        setShippingDate(data.delivery_date)
        setIsOnShipping(true)
        setExternalId(data.external_id)
      }

      if(data.status === 1 || data.status === 2 || data.status === 3){
        setPaymentMethod(data.payment_method)
        setPaymentDate(data.payment_date)
        setIsPaymentDone(true)
      }

      if(data.status === 3){
        setReceivedDate(data.receive_date)
      }

      if( data.status === 4 ){
        setReason(data.reasons)
      }

      if(data.status === 1 || data.status === 2 || data.status === 3){
        localStorage.setItem("dataInvoice",JSON.stringify(data))
      }


      setCourierType(data.courier_name)
      setCourierPrice(data.courier_rate)
      setProductDetails(data.product_detail)
      setTransactionNumber(data.order_number)
      setCustomerDetail(data.user_detail)
      setStatus(data.status)
      setTransactionDate(data.created_at)
      setIsVerified(data.account)

      // PRICE
      setPpn(data.product_detail.total_price_after_tax - data.product_detail.total_price)
      setItemSubTotal(data.product_detail.price * data.product_detail.quantity)
      setTrasactionSubTotal(data.product_detail.price * data.product_detail.quantity)
      setTrasactionTotal(data.total_purchase_after_tax)
      
      setIsLoading(false)
    }
  },[dataOrder.orderDetailResp, dispatch])

  useEffect(()=>{
    setDetailOrder(dispatch, orderId)
    setIsLoading(true)
  },[dispatch, orderId])

  return (    
    isLoading === false && 
    <div className="container_right_form">
      <MainForm
        pageName={"Order Detail"}
        trackShipment={trackShipment}
        dataForm={dataForm}
        linkAccReview={"../accountReview"}
        status={status}
        orderId={id}
        pageFor={"detail"}
        isVerified={isVerified}
        requestDate={requestDate}
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
