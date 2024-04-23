import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTableDnD.module.scss';
import BaseTableDnD from "./BaseTableDnD";
import { connect } from "react-redux";
import { setBanner, resetBanner, setBannerOrder } from '../../store/actions/bannerAction'

const ShipyardBannerTable = ({
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

  const orderBannerId = (banners) => {
    let ids = []
    for (let oneData in banners) {
      ids.push(banners[oneData].id)
    }
    return ids
  }

  const setOrderBanner = () => {
    const data = {
      bannerType: "shipyard",
      bannerIds: orderBannerId(tempOrder)
  }
    setBannerOrder(dispatch, data)
    setReorderState(!reorderState)
  }

	useEffect(()=>{
    setBanner(dispatch, "shipyard")
	},[])

  useEffect(()=>{
    if( dataBanner.bannerListResp ){
      resetBanner(dispatch)
      setData(dataBanner.bannerListResp)
    }
  },[dataBanner.bannerListResp])

	return (
    data &&
    <Container className={styles.container}>
      <Row>
        <Col xs="9">
          <p className={styles.main_title}>
            {pageName}
          </p>
        </Col>
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
          <Link to={linkAddNew}>
            <Button className={styles.save_button_2}>
              {"New "+pageName}
            </Button>
          </Link>
        </Col>
        {/* <Col xs="3">
          <InputGroup>
            <InputGroup.Text id="basic-addon2" className={styles.icon_search}>
              {<BiSearchAlt/>}
            </InputGroup.Text>
            <Form.Control 
              className={styles.field_search}
              type={"text"} 
              placeholder={"Search"}
            />
          </InputGroup >
        </Col>
        <Col xs="2">
          <Button className={styles.save_button} onClick={()=>setSearchKeyword("bima")}>
            {"Search"}
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
        </Col> */}
        <Col xs={{span: reorderState? "4":"2", offset: reorderState? "5":"7" }}>
          { reorderState &&
            <Button className={styles.apply_order_button} onClick={()=>setOrderBanner()}>
              {"Apply Order"}
            </Button>
          }
          &nbsp;
          &nbsp;
          &nbsp;
          <Button className={styles.cancel_button} onClick={()=>setReorderState(!reorderState)}>
            {reorderState ? "Cancel" : "Reorder"}
          </Button>
        </Col>
      </Row>
      <BaseTableDnD 
        data={data} 
        totalPages={totalPages}
        reorderState={reorderState}
        linkDetail={"../shipyardBannerDetail/"} 
        searchKeyword={searchKeyword}
        setTempOrder={setTempOrder}
      />
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
)(ShipyardBannerTable)  