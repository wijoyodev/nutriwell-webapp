import React, { useEffect, useState } from "react";
import { Row, Container } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import styles from '../BaseTable.module.scss';
import BaseTable from "../BaseTable";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const ReferenceNetworkTable = ({
  pageName,
  memberNetwork,
  dispatch,
  setNetworkById,
}) => {

  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setNetworkById(dispatch, (pageNumber-1)*10)
  }

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
  }

  useEffect(()=>{
    if( memberNetwork ){
      setDataShown(memberNetwork.data)
      setPagination({
        offset: memberNetwork.offset, 
        limit: memberNetwork.limit, 
        total: memberNetwork.total_network, 
      })
    }
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
              Curently no Reference Network data..
            </p>
          </>
        }
      </Container>
    </>
	);
};

const storage = state => {
  return {
    dataMember: state.member
  };
};

export default connect(
  storage
)(ReferenceNetworkTable)  