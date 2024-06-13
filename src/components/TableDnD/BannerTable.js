import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTableDnD.module.scss';
import BaseTableDnD from "./BaseTableDnD";
import { connect } from "react-redux";
import { setBanner, setBannerSearch } from '../../store/actions/bannerAction'

const BannerTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataBanner,
}) => {

  const totalPages = 17;

  const [activePage, setActivePage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [reorderState, setReorderState] = useState(false)
  const [tempOrder, setTempOrder] = useState([])
  const [data, setData] = useState(null)

  const handlePageChange = (pageNumber) => {
    let currPage = pageName
    setActivePage(currPage)
  }
  
  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['search'] = searchKeyword
    }
    setBannerSearch(dispatch, params)
  }

  const manageListBanner = (listData) => {
    let finalData = []
    for( let i=0 ; i < listData.length ; i++ ){
      finalData.push({
        "id": listData[i].id,
        "code": listData[i].code,
        "title": listData[i].title,
        "linkUrl": "https://google.com/",
        "imageUrl": listData[i].image_url,
        "orderNum": i+1,
        "createdAt": listData[i].created_at,
        "updatedAt": listData[i].updated_at
      })
    }
    setData(finalData)
  }

	useEffect(()=>{
    setBanner(dispatch)
	},[])

  useEffect(()=>{
    if( dataBanner.bannerListResp ){
      console.log("MASUK BANNER TABLE", dataBanner.bannerListResp)
      manageListBanner(dataBanner.bannerListResp)
    }
  },[dataBanner.bannerListResp])


	return (
    <Container className={styles.container}>
      <Row>
        <Col xs="10">
          <p className={styles.main_title}>
            {pageName}
          </p>
        </Col>
        <Col xs="2" className="text-end">
          <Link to={linkAddNew}>
            <Button className={styles.save_button_2}>
              {"Add Banner"}
            </Button>
          </Link>
        </Col>
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
        <Col xs="3 mt-4">
          <Button className={styles.save_button} onClick={(e)=>doSearch(e)}>
            {"Apply"}
          </Button>
        </Col>
      </Row>
      {
        data && 
          <BaseTableDnD 
            data={data} 
            totalPages={totalPages}
            reorderState={reorderState}
            linkDetail={"../bannerDetail/"} 
            searchKeyword={searchKeyword}
            setTempOrder={setTempOrder}
          />
      }
      {
        !data && 
        <p> currently no Banner data shown </p>
      }
    </Container>
	);
};

const storage = state => {
  return {
    dataBanner: state.banner
  };
};

export default connect(
  storage
)(BannerTable)  