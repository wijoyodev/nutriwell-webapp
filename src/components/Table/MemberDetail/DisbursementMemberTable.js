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

const DisbursementMemberTable = ({
  pageName,
  linkAddNew,
  dispatch, 
  dataDisbursement,
}) => {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})
  const [searchKeyword, setSearchKeyword] = useState(null)

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'ID': datas[idx].id,
        'Tanggal Request': new Date(datas[idx].created_at).toLocaleString(),
        'Tanggal Disbursement': new Date(datas[idx].success_disbursement_date).toLocaleString(),
        'Nama': datas[idx].full_name,
        'Jumlah Ditarik': datas[idx].disbursement_value,
        'STATUS': datas[idx].status_disbursement,
      })
    }
    setData(listData)
  }

	useEffect(()=>{
    setDataShown(dataDisbursement)
	},[])

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
            linkDetail={"../disbursementDetail/"} 
            pagination={pagination}
            section={"disbursement"}
            activePage={activePage}
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
)(DisbursementMemberTable)  