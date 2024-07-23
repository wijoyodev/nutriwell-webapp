import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAllOrder } from '../../store/actions/orderAction'

const SalesReportTable = ({
  pageName,
  dispatch, 
  dataOrder,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [totalNetIncome, setTotalNetIncome] = useState("")
  const [totalGrossIncome, setTotalGrossIncome] = useState("")
  const [pagination, setPagination] = useState({})
  const [searchKeyword, setSearchKeyword] = useState(null)

  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['search'] = searchKeyword
    }
    if( startDate && endDate ){
      params['start'] = Math.floor(new Date(startDate).getTime() / 1000)
      params['end'] = Math.floor(new Date(endDate).getTime() / 1000)
    }
    setAllOrder(dispatch, 0, params)
  }

  const doClearFilter = (e) => {
    e.preventDefault()
    let params = {search: ""}
    
    setSearchKeyword("")
    setDateRange([null, null])
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
        'Tanggal Bayar': new Date(datas[idx].payment_date).toLocaleString(),
        'Nama': datas[idx].user_detail.full_name,
        'QTY': datas[idx].product_detail.quantity,
        'Jumlah': datas[idx].product_detail.total_price,
        'Net Income': datas[idx].net_income,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllOrder(dispatch, 0)
	},[dispatch])

  useEffect(()=>{
    if( dataOrder.orderSearchResp ){
      setDataShown(dataOrder.orderSearchResp.data)
      setTotalNetIncome(dataOrder.orderSearchResp.total.totalNetIncome)
      setTotalGrossIncome(dataOrder.orderSearchResp.total.totalGrossIncome)
      setPagination({
        offset: dataOrder.orderSearchResp.offset, 
        limit: dataOrder.orderSearchResp.limit, 
        total: dataOrder.orderSearchResp.total.totalOrders, 
      })
    }
  },[dataOrder.orderSearchResp])

	return (
    <>
      <p className={styles.main_title}>
        {pageName}
      </p>
      <Container className={styles.container}>
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
          <Col xs="5">
            <Form.Label htmlFor="basic-url">Search</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon2" className={styles.icon_search}>
                {<BiSearchAlt/>}
              </InputGroup.Text>
              <Form.Control 
                className={styles.field_search}
                type={"text"} 
                placeholder={"no resi-tanpa huruf / no order .."}
                onChange={(e)=>setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
            </InputGroup >
          </Col>
          <Col xs="3">
            <Form.Label htmlFor="basic-url">Range Date</Form.Label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              placeholderText="Choose Range Date"
              className={styles.date_picker}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
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
            pagination={pagination}
            section={"salesReport"}
            totalNetIncome={totalNetIncome}
            totalGrossIncome={totalGrossIncome}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
          :
          <>
            <br/>
            <br/>
            <p>
              Curently no Sales Report data..
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
)(SalesReportTable)  