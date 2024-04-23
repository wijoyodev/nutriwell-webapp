import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";
import { connect } from "react-redux";
import { setAllSupplier, setSearchSupplierOwner } from '../../store/actions/supplierAction'

const SupplierContractorTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataSupplier,
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
    setSearchSupplierOwner(dispatch, params)
  }

  const doClearFilter = (e) => {
    let params = {keyword: ""}
    
    setSearchKeyword("")
    setSearchSupplierOwner(dispatch, params)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setAllSupplier(dispatch, pageNumber)
  }

  const setDataShown = (datas) => {
    let listData = []
    let offer = ""

    for (let idx in datas) {
      if( datas[idx].supplier && datas[idx].contractor ){
        offer = "Supplier, Contractor Services"
      }else if( datas[idx].supplier && !datas[idx].contractor ){
        offer = "Supplier Services"
      }else if( !datas[idx].supplier && datas[idx].contractor ){
        offer = "Contractor Services"
      }else{
        offer = "-"
      }

      listData.push({
        'COMPANY ID': datas[idx].id || "-",
        'COMPANY NAME': datas[idx].companyName || "-",
        'WEBSITE': datas[idx].companyEmail || "-",
        'COMPANY OFFER': offer,
        'STATUS': datas[idx].account.isVerified,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setAllSupplier(dispatch, activePage)
	},[])

  useEffect(()=>{
    if( dataSupplier.allSupplierResp ){
      setDataShown(dataSupplier.allSupplierResp.supplierContractors)
      setPagination(dataSupplier.allSupplierResp.pagination)
    }
  },[dataSupplier.allSupplierResp])

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
              {"New Supp & Cont"}
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
          linkDetail={"../supplierContractorDetail/"}
          pagination={pagination}
          section={"supplier"}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
        :
        <>
          <br/>
          <br/>
          <p>
            no Supplier / Contractor Data, please add new one
          </p>
        </>
      }
    </Container>
	);
};

const storage = state => {
  return {
    dataSupplier: state.supplier
  };
};

export default connect(
  storage
)(SupplierContractorTable)  
