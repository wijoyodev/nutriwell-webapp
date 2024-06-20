import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { setAllMember,setAllLocation } from '../../store/actions/memberAction'

const MemberTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataMember,
}) => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [activePage, setActivePage] = useState(0)
  const [locations, setLocations] = useState([])
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchKeyword, setSearchKeyword] = useState(null)
  const [selectedLoc, setSelectedLoc] = useState(null)

  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['search'] = searchKeyword
    }
    if( selectedLoc && selectedLoc !== '0' ){
      params['location_id'] = selectedLoc
    }
    console.log(params, "<PARAMS", selectedLoc)
    setAllMember(dispatch, 0 ,params)
  }

  const doClearFilter = (e) => {
    let params = {search: ""}
   
    setSearchKeyword("")
    setAllMember(dispatch, 0, params)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllMember(dispatch, (pageNumber-1)*10)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ID': datas[idx].id,
        'Nama': datas[idx].full_name,
        'Domisili': datas[idx].address_detail.city,
        'Jumlah Downline': datas[idx].total_downlines,
        'Total Komisi': datas[idx].total_profit,
      })
    }
    setData(listData)
  }

  const setLocationShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'id': datas[idx].id,
        'value': datas[idx].city,
      })
    }
    setLocations(listData)
  }

	useEffect(()=>{
    setAllMember(dispatch, 0)
    setAllLocation(dispatch)
	},[])

  useEffect(()=>{
    if( dataMember.allMemberResp ){
      console.log(dataMember.allMemberResp, "<<dataMember.allMemberResp")
      setDataShown(dataMember.allMemberResp.data)
      setPagination({
        offset: dataMember.allMemberResp.offset, 
        limit: dataMember.allMemberResp.limit, 
        total: dataMember.allMemberResp.total, 
      })
    }
  },[dataMember.allMemberResp])

  useEffect(()=>{
    if( dataMember.setAllLocationResp ){
      console.log(dataMember.setAllLocationResp, "<<dataMember.setAllLocationResp")
      setLocationShown(dataMember.setAllLocationResp)
    }
  },[dataMember.setAllLocationResp])

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
            <Form.Label htmlFor="basic-url">Filter by Location</Form.Label>
            <Form.Select aria-label="Choose Location" className={styles.field_form} onChange={(e)=>setSelectedLoc(e.target.value)} >
              <option value="0">{"Select Location"}</option>
              {locations.map( (item, index)=>{
                return <option index={index} value={item.id} id={item.id}>{item.value}</option>
              })}
            </Form.Select>
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
              Curently no Member data..
            </p>
          </>
        }
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataMember: state.member,
  };
};

export default connect(
  storage
)(MemberTable)  