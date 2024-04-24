import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import { setAllShipyard, setSearchShipyardOwner } from '../../store/actions/shipyardAction'

const OrderManagementTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataShipyard,
}) => {

  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchKeyword, setSearchKeyword] = useState(null)

  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['keyword'] = searchKeyword
    }
    setSearchShipyardOwner(dispatch, params)
  }

  const doClearFilter = (e) => {
    let params = {keyword: ""}
   
    setSearchKeyword("")
    setSearchShipyardOwner(dispatch, params)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllShipyard(dispatch, pageNumber)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ID': datas[idx].id,
        'Tanggal Pesan': new Date(datas[idx].orderDate).toLocaleString(),
        'Nama': datas[idx].name,
        'QTY': datas[idx].quantity,
        'Jumlah': datas[idx].total,
        'STATUS': datas[idx].status,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    // setAllShipyard(dispatch, activePage)
    
    // FOR SLICING DATA ONLY 
    setDataShown([{
      id: "ORO000",
      orderDate: 1709735589,
      name: "PT Sukro",
      quantity: 9,
      total: 999,
      status: "Selesai"
    },{
      id: "ORO001",
      orderDate: 1709735589,
      name: "Alima Putra",
      quantity: 1,
      total: 102,
      status: "Dikemas"
    },{
      id: "ORO002",
      orderDate: 1709735589,
      name: "Yuloha Sukima",
      quantity: 1,
      total: 102,
      status: "Belum Bayar"
    },{
      id: "ORO003",
      orderDate: 1709735589,
      name: "Maratus K",
      quantity: 1,
      total: 102,
      status: "Dikirim"
    },{
      id: "ORO004",
      orderDate: 1709735589,
      name: "Saikoji",
      quantity: 1,
      total: 1,
      status: "Dibatalkan"
    }])
    // FOR SLICING DATA ONLY 

	},[])

  // useEffect(()=>{
  //   if( dataShipyard.allShipyardResp ){
  //     setDataShown(dataShipyard.allShipyardResp.data)
  //     setPagination(dataShipyard.allShipyardResp.pagination)
  //   }
  // },[dataShipyard.allShipyardResp])

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
                placeholder={"Search"}
                onChange={(e)=>setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
            </InputGroup >
          </Col>
          <Col xs="3">
            <Form.Label htmlFor="basic-url">Filter by Status</Form.Label>
            <Form.Select aria-label="Choose Status" className={styles.field_form} >
              <option>{"Select Status"}</option>
              <option>{"Selesai"}</option>
              <option>{"Belum Bayar"}</option>
              <option>{"Dikemas"}</option>
              <option>{"Dikirim"}</option>
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
    dataShipyard: state.shipyard
  };
};

export default connect(
  storage
)(OrderManagementTable)  