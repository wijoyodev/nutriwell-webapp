import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import { setAllAdmin, setSearchAdmin } from '../../store/actions/adminAction'

const AdminManagementTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataAdmin,
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
    setSearchAdmin(dispatch, params)
  }

  const doClearFilter = (e) => {
    setSearchKeyword("")
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllAdmin(dispatch, pageNumber)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ADMIN ID': datas[idx].id,
        'NAME': datas[idx].name,
        'EMAIL': datas[idx].account.email,
        'STATUS': datas[idx].account.isActive,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllAdmin(dispatch, activePage)
	},[])

  useEffect(()=>{
    if( dataAdmin.allAdminResp ){
      setDataShown(dataAdmin.allAdminResp.admins)
      setPagination(dataAdmin.allAdminResp.pagination)
    }
  },[dataAdmin.allAdminResp])

	return (
    data &&
    <Container className={styles.container}>
      <Row>
        <Col xs="9">
          <p className={styles.main_title}>
            {pageName}
          </p>
        </Col>
        <Col xs="3">
          <Link to={linkAddNew}>
            <Button className={styles.save_button_2}>
              {"New Admin"}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {/* <Col xs="5">
          <InputGroup>
            <InputGroup.Text id="basic-addon2" className={styles.icon_search}>
              {<BiSearchAlt/>}
            </InputGroup.Text>
            <Form.Control 
              className={styles.field_search}
              type={"text"} 
              placeholder={"Search Company Name . . ."}
              onChange={(e)=>setSearchKeyword(e.target.value)}
              value={searchKeyword}
            />
          </InputGroup >
        </Col> */}
        {/* <Col xs="3">
          <Form.Select aria-label="Default select example" className={styles.field_form} >
            <option>{"Select Region"}</option>
            <option>{"Jakarta Utara"}</option>
            <option>{"Bekasi"}</option>
            <option>{"Cilegon"}</option>
          </Form.Select>
        </Col> */}
        {/* <Col xs="4">
          <Button className={styles.save_button} onClick={(e)=>doSearch(e)}>
            {"Apply"}
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          <Button className={styles.cancel_button} onClick={(e)=>doClearFilter(e)} >
            {"Clear"}
          </Button>
        </Col> */}
      </Row>
      {data.length > 0 ?
        <BaseTable 
          data={data} 
          linkDetail={"../adminDetailPage/"} 
          pagination={pagination}
          section={"admin"}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
        :
        <>
          <br/>
          <br/>
          <p>
            no Admin Data, please add new one
          </p>
        </>
      }
    </Container>
	);
};

const storage = state => {
  return {
    dataAdmin: state.admin
  };
};

export default connect(
  storage
)(AdminManagementTable)  