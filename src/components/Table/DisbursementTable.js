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
import { setDisbursementList } from '../../store/actions/memberAction'

const DisbursementTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataMember,
}) => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [activePage, setActivePage] = useState(1)
  const [status, setStatus] = useState(0);
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchKeyword, setSearchKeyword] = useState(null)

  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['search'] = searchKeyword
    }
    if( status && status !== "Select Status" ){
      params['status'] = status
    }
    if( startDate && endDate ){
      params['start'] = Math.floor(new Date(startDate).getTime() / 1000)
      params['end'] = Math.floor(new Date(endDate).getTime() / 1000)
    }
    setDisbursementList(dispatch, 0, params)
  }

  const doClearFilter = (e) => {
    e.preventDefault()
    let params = {search: ""}
    
    setSearchKeyword("")
    setDisbursementList(dispatch, 0, params)
    setDateRange([null, null])
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setDisbursementList(dispatch, (pageNumber-1)*10)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ID': datas[idx].id,
        'Tanggal Request': new Date(datas[idx].created_at).toLocaleString(),
        'Tanggal Disbursement': new Date(datas[idx].success_disbursement_date).toLocaleString(),
        'Nama': datas[idx].full_name,
        'HIDDEN user_id': datas[idx].user_id,
        'Jumlah Ditarik': datas[idx].disbursement_value,
        'STATUS': datas[idx].status_disbursement,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setDisbursementList(dispatch, 0)
	},[])

  useEffect(()=>{
    if( dataMember.allDisbursementResp ){
      setDataShown(dataMember.allDisbursementResp.data)
    }
  },[dataMember.allDisbursementResp])

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
            <Form.Select aria-label="Choose Status" className={styles.field_form} 
              onChange={ (e)=> setStatus(e.target.value)}
            >
              <option>{"Select Status"}</option>
              <option>{"Pending"}</option>
              <option>{"Complete"}</option>
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
                console.log("update date", update)
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
            linkDetail={"../disbursementDetail/"} 
            pagination={pagination}
            section={"disbursement"}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
          :
          <>
            <br/>
            <br/>
            <p>
              Curently no Disbursement data..
            </p>
          </>
        }
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataMember: state.member
  };
};

export default connect(
  storage
)(DisbursementTable)  