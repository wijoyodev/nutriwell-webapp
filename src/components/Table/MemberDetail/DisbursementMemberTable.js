import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { useParams } from "react-router-dom";
import styles from '../BaseTable.module.scss';
import BaseTable from "../BaseTable";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const DisbursementMemberTable = ({
  pageName,
  dataDisbursement,
  setDisbursementGeneral,
  dispatch,
}) => {

  const { memberId } = useParams()
  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setDisbursementGeneral(dispatch, (pageNumber-1)*10)
  }

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
    setDataShown(dataDisbursement.data)
    setPagination({
      offset: dataDisbursement.offset, 
      limit: dataDisbursement.limit, 
      total: dataDisbursement.total_disbursement_data, 
    })
	},[dataDisbursement])

	return (
    <>
      <p className={styles.main_title}>
        {pageName}
      </p>
      <Container className={styles.container_2}>
        {data.length > 0 ?
          <BaseTable 
            data={data} 
            linkDetail={"../memberDetail/"} 
            pagination={pagination}
            section={"disbursementMember"}
            activePage={activePage}
            memberId={memberId}
            handlePageChange={handlePageChange}
          />
          :
          <>
            <br/>
            <br/>
            <p>
              Curently no Disbursement Member data..
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
)(DisbursementMemberTable)  