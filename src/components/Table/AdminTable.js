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
import { setAllAdmin } from '../../store/actions/adminAction'

const AdminTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataAdmin,
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
        'Nama': datas[idx].full_name,
        'Email': datas[idx].email,
        'ROLE': datas[idx].role_name,
        'STATUS': datas[idx].status,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllAdmin(dispatch)
    
    // FOR SLICING DATA ONLY 
    // setDataShown([{
    //   id: "DI0100",
    //   name: "PT Sukro",
    //   email: "suryo.kencono@mail.com",
    //   role: "Super Admin",
    //   status: "Active"
    // },{
    //   id: "DI0101",
    //   name: "Alima Putra",
    //   email: "AlimaPutra@gmail.com",
    //   role: "Super Admin",
    //   status: "Active"
    // },{
    //   id: "DI0102",
    //   name: "Yuloha Sukima",
    //   email: "YulohaSukima@gmail.com",
    //   role: "Admin Packing",
    //   status: "Inactive"
    // },{
    //   id: "DI0103",
    //   name: "Maratus K",
    //   email: "MaratusK@gmail.com",
    //   role: "Super Admin",
    //   status: "Inactive"
    // },{
    //   id: "DI0104",
    //   name: "Saikoji",
    //   email: "Saikoji.putra@gmail.com",
    //   role: "Manager",
    //   status: "Inactive"
    // }])
    // FOR SLICING DATA ONLY 

	},[])

  useEffect(()=>{
    if( dataAdmin.allAdminResp ){
      console.log(dataAdmin.allAdminResp, "<<dataAdmin.allAdminResp")
      setDataShown(dataAdmin.allAdminResp)
    }
  },[dataAdmin.allAdminResp])

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
            <Form.Select aria-label="Choose Status" className={styles.field_form} >
              <option>{"Select Status"}</option>
              <option>{"Active"}</option>
              <option>{"Inactive"}</option>
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
          <Col xs={{ span:2, offset:1 }} className="mt-4">
            <Link to={"./addAdmin"}>
              <Button className={styles.add_button}>
                {"Add Admin"}
              </Button>
            </Link>
          </Col>
        </Row>
        {console.log(data, "<<BEFORE PRESENT")}
        {data.length > 0 ?
          <BaseTable 
            data={data} 
            linkDetail={"../adminDetail/"} 
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
    dataAdmin: state.admin,
  };
};

export default connect(
  storage
)(AdminTable)  