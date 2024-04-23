import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAllShipyard, setSearchShipyardOwner } from '../../store/actions/shipyardAction'

const MemberTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataShipyard,
}) => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
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
        'Nama': datas[idx].name,
        'Domisili': datas[idx].domisili,
        'Jumlah Downline': datas[idx].totalDownline,
        'Total Komisi': datas[idx].totalComission,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllShipyard(dispatch, activePage)
    
    // FOR SLICING DATA ONLY 
    setDataShown([{
      id: "DI0100",
      name: "PT Sukro",
      domisili: "DKI Jakarta",
      totalDownline: "55",
      totalComission: "15000000"
    },{
      id: "DI0101",
      name: "Alima Putra",
      domisili: "DKI Jakarta",
      totalDownline: "55",
      totalComission: "2000000"
    },{
      id: "DI0102",
      name: "Yuloha Sukima",
      domisili: "DKI Jakarta",
      totalDownline: "55",
      totalComission: "15000000"
    },{
      id: "DI0103",
      name: "Maratus K",
      domisili: "DKI Jakarta",
      totalDownline: "55",
      totalComission: "500000"
    },{
      id: "DI0104",
      name: "Saikoji",
      domisili: "DKI Jakarta",
      totalDownline: "55",
      totalComission: "150000000"
    }])
    // FOR SLICING DATA ONLY 

	},[])

  useEffect(()=>{
    if( dataShipyard.allShipyardResp ){
      setDataShown(dataShipyard.allShipyardResp.data)
      setPagination(dataShipyard.allShipyardResp.pagination)
    }
  },[dataShipyard.allShipyardResp])

	return (
    <>
      <Row className="mb-3">
        <Col xs={4}>
          <p className={styles.main_title}>
            {pageName}
          </p>
        </Col>
        <Col xs={{span: 3, offset: 5}} className="text-end">
          <Link to={linkAddNew}>
            <Button className={styles.save_button_2}>
              {"Add Member"}
            </Button>
          </Link>
        </Col>
      </Row>
      <Container className={styles.container}>
        <Row>
          <Col xs="3">
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
              <option>{"Pending"}</option>
              <option>{"Berhasil"}</option>
            </Form.Select>
          </Col>
          <Col xs="3">
            <Form.Label htmlFor="basic-url">Range Date</Form.Label>
            <DatePicker
              selectsRange={true}
              placeholderText="Choose Range Date"
              startDate={startDate}
              endDate={endDate}
              className={styles.date_picker}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
            />
          </Col>
          <Col xs="3" className="mt-4">
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
            linkDetail={"../memberDetail/"} 
            pagination={pagination}
            section={"adminManagement"}
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
    dataShipyard: state.shipyard
  };
};

export default connect(
  storage
)(MemberTable)  