import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTableDnD.module.scss';
import BaseTableDnD from "./BaseTableDnD";
import { connect } from "react-redux";
import { setBanner, resetBanner, setBannerOrder } from '../../store/actions/bannerAction'

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

  const orderBannerId = (banners) => {
    let ids = []
    for (let oneData in banners) {
      ids.push(banners[oneData].id)
    }
    return ids
  }

  const doSearch = (e) => {
    e.preventDefault()
    let params = {}
    if( searchKeyword ){
      params['keyword'] = searchKeyword
    }
  }

  const setOrderBanner = () => {
    const data = {
      bannerType: "supplier",
      bannerIds: orderBannerId(tempOrder)
  }
    setBannerOrder(dispatch, data)
    setReorderState(!reorderState)
  }

	useEffect(()=>{
    setBanner(dispatch, "supplier")

    // for data testing only
    setData([
      {
        "id": "52fe7f43-ce0d-40de-9aae-a3ce1b9c6d5a",
        "title": "Masakan kenabran jadin lebih sehat",
        "linkUrl": "https://google.com/",
        "imageUrl": "https://media.istockphoto.com/id/1931938426/id/foto/tangan-merobek-kertas-itu-komunikasi-media-sosial-kolase-seni-kontemporer-terisolasi-desain.jpg?s=1024x1024&w=is&k=20&c=037-WFMX6PTcRlsykBvrBSMFxFeI4R3E2M44TzsvDw8=",
        "orderNum": 1,
        "createdAt": 1693895989,
        "updatedAt": 0
      },{
        "id": "52fe7f43-ce0d-40de-9aae-a3ce1b9c6d5a",
        "title": "Manfaat garam GARENA",
        "linkUrl": "https://google.com/",
        "imageUrl": "https://media.istockphoto.com/id/1931938426/id/foto/tangan-merobek-kertas-itu-komunikasi-media-sosial-kolase-seni-kontemporer-terisolasi-desain.jpg?s=1024x1024&w=is&k=20&c=037-WFMX6PTcRlsykBvrBSMFxFeI4R3E2M44TzsvDw8=",
        "orderNum": 2,
        "createdAt": 1693895989,
        "updatedAt": 0
      }
    ])
    
    // for data testing only
	},[])

  useEffect(()=>{
    // if( dataBanner.bannerListResp ){
    //   resetBanner(dispatch)
    //   setData(dataBanner.bannerListResp)
    // }
  },[dataBanner.bannerListResp])


	return (
    data &&
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
        <Col xs={{span: reorderState? "4":"2", offset: reorderState? "2":"4" }} className="text-end mt-4">
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
        linkDetail={"../bannerDetail/"} 
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
)(BannerTable)  