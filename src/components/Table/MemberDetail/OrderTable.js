import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { useParams } from 'react-router-dom';
import styles from '../BaseTable.module.scss';
import BaseTable from "../BaseTable";
import { connect } from "react-redux";
import { setAllOrder } from '../../../store/actions/orderAction'

const OrderTable   = ({
  pageName,
  dispatch,
  dataOrder,
}) => {

  const { memberId } = useParams()
  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [status, setStatus] = useState(null)
  const [pagination, setPagination] = useState(0)

  const doSearch = (e) => {
    e.preventDefault()
    let params = {user_id: memberId}
    if( status ){
      status ===  99 ? params['status'] = '' : params['status'] = status;
    }
    setAllOrder(dispatch, 0, params)
  }

  const doClearFilter = (e) => {
    e.preventDefault()
    let params = {user_id: memberId}
   
    setAllOrder(dispatch, 0, params)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllOrder(dispatch, (pageNumber-1)*10)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ID': datas[idx].id,
        'Tanggal Pesan': new Date(datas[idx].created_at).toLocaleString(),
        'Nama': datas[idx].user_detail.full_name,
        'QTY': datas[idx].product_detail.quantity,
        'Jumlah': datas[idx].product_detail.total_price,
        'STATUS': setStatusShown(datas[idx].status),
      })
    }
    setData(listData)
  }

  const setStatusShown = (status) => {
    switch (status) {
      case 0:
        return 'Belum Bayar';
      case 1:
        return 'Dikemas';
      case 2:
        return 'Dikirim';
      case 3:
        return 'Selesai';
      case 4:
        return 'Dibatalkan';
      default:
        return 'Dibatalkan';
    }
  }

  useEffect(()=>{
    if( dataOrder.orderSearchResp ){
      setDataShown(dataOrder.orderSearchResp.data)
      setPagination({
        offset: dataOrder.orderSearchResp.offset, 
        limit: dataOrder.orderSearchResp.limit, 
        total: dataOrder.orderSearchResp.total, 
      })
    }
  },[dataOrder.orderSearchResp])

	useEffect(()=>{
    setAllOrder(dispatch, 0, {user_id: memberId})
	},[dispatch, memberId])

	return (
    <>
      <p className={styles.main_title}>
        {pageName}
      </p>
      <Container className={styles.container_2}>
        <Row>
          {/* <Col xs="3">
            <Link to={linkAddNew}>
              <Button className={styles.save_button_2}>
                {"New "+pageName}
              </Button>
            </Link>
          </Col> */}
        </Row>
        <Row>
          <Col xs="3">
            <Form.Label htmlFor="basic-url">Filter by Status</Form.Label>
            <Form.Select aria-label="Choose Status" className={styles.field_form} onChange={(e)=>setStatus(e.target.value)} >
              <option value="99">{"Select Status"}</option>
              <option value="0">{"Belum Bayar"}</option>
              <option value="1">{"Dikemas"}</option>
              <option value="2">{"Dikirim"}</option>
              <option value="3">{"Selesai"}</option>
              <option value="4">{"Dibatalkan"}</option>
            </Form.Select>
          </Col>
          <Col xs="4" className="mt-4">
            <Button className={styles.save_button} onClick={(e)=>doSearch(e)}>
              {"Apply"}
            </Button>
            &nbsp;
            &nbsp;
            &nbsp;
            <Button className={styles.cancel_button} onClick={(e)=>doClearFilter(e)} >
              {"Cancel"}
            </Button>
          </Col>
        </Row>
        {data.length > 0 ?
          <BaseTable 
            data={data} 
            linkDetail={"../orderManagementDetail/"} 
            pagination={pagination}
            section={"orderManagement"}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
          :
          <>
            <br/>
            <br/>
            <p>
              Curently no order data..
            </p>
          </>
        }
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataOrder: state.order
  };
};

export default connect(
  storage
)(OrderTable  )  