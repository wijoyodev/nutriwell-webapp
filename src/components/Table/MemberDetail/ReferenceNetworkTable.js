import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from '../BaseTable.module.scss';
import BaseTable from "../BaseTable";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAllShipyard, setSearchShipyardOwner } from '../../../store/actions/shipyardAction'

const ReferenceNetworkTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataShipyard,
  memberNetwork,
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

  console.log("memberNetworkmemberNetwork", memberNetwork)

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'Nama': datas[idx].full_name,
        'Nomor Telepon': datas[idx].phone_number,
        'Email': datas[idx].email,
        'Tanggal Join': datas[idx].join_date,
        'Domisili': "datas[idx].city",
        'Level': datas[idx].level,
      })
    }
    setData(listData)
    console.log(listData, "<<<list data")
  }

	useEffect(()=>{
    setAllShipyard(dispatch, activePage)
    
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
    if( memberNetwork ){
      setDataShown(memberNetwork.data)
      setPagination({
          offset: memberNetwork.offset, 
          limit: memberNetwork.limit, 
          total: memberNetwork.total, 
        })
    }
    console.log(memberNetwork,"<<memberNetwork")
  },[memberNetwork])

	return (
    <>
      <p className={styles.main_title}>
        {pageName}
      </p>
      <Container className={styles.container_2}>
        <Row>
          {/* <Col xs="3">
            <Link to={linkAddNew}>
              <Button className={styles.save_button_2}>
                {"New "+pageName}
              </Button>
            </Link>
          </Col> */}
        </Row>
        {data.length > 0 ?
          <BaseTable 
            data={data} 
            // linkDetail={"../adminDetail/"} 
            pagination={pagination}
            section={"referenceNetwork"}
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
)(ReferenceNetworkTable)  