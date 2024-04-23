import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import { setAllShipOwner, setSearchShipOwner } from '../../store/actions/shipAction'


const ShipOwnerTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataShip,
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
    setSearchShipOwner(dispatch, params)
  }

  const doClearFilter = (e) => {
    let params = {keyword: ""}

    setSearchKeyword("")
    setSearchShipOwner(dispatch, params)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllShipOwner(dispatch, pageNumber)
  }

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'COMPANY ID': datas[idx].id,
        'COMPANY NAME': datas[idx].companyName,
        'COMPANY EMAIL': datas[idx].companyEmail,
        'PERSON IN CHARGE': datas[idx].picName,
        'PHONE NUMBER': datas[idx].picPhoneNumber,
        'PHONE NUMBER': datas[idx].picPhoneNumber,
        // 'STATUS': datas[idx].account.isVerified,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllShipOwner(dispatch, activePage)
	},[])

  useEffect(()=>{
    if( dataShip.allShipOwnerResp ){
      setDataShown(dataShip.allShipOwnerResp.shipOwners)
      setPagination(dataShip.allShipOwnerResp.pagination)
      setActivePage(dataShip.allShipOwnerResp.pagination.page)
    }
  },[dataShip.allShipOwnerResp])

	return (
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
              {"New "+pageName}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
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
        </Col>
        {/* <Col xs="3">
          <Form.Select aria-label="Default select example" className={styles.field_form} >
            <option>{"Select Region"}</option>
            <option>{"Jakarta Utara"}</option>
            <option>{"Bekasi"}</option>
            <option>{"Cilegon"}</option>
          </Form.Select>
        </Col> */}
        <Col xs="4">
          <Button className={styles.save_button} onClick={(e)=>doSearch(e)}>
            {"Apply"}
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          <Button className={styles.cancel_button} onClick={(e)=>doClearFilter(e)} >
            {"Clear"}
          </Button>
        </Col>
      </Row>
      {data.length > 0 ?
        <BaseTable 
          data={data} 
          linkDetail={"../shipOwnerDetail/"}
          pagination={pagination}
          section={"ship"}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
        :
        <>
          <br/>
          <br/>
          <p>
            no Ship Data, please add new one
          </p>
        </>
      }
    </Container>
	);
};

const storage = state => {
  return {
    dataShip: state.ship
  };
};

export default connect(
  storage
)(ShipOwnerTable)  
