import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import styles from '../BaseTable.module.scss';
import BaseTable from "../BaseTable";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const RewardTable = ({
  pageName,
  dataReward,
  setRewardDetail,
  dispatch,
}) => {

  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({})

  const setDataShown = (datas) => {
    let listData = []
    for (let idx in datas) {
      listData.push({
        'Tanggal': datas[idx].created_at,
        'Deskripsi': datas[idx].description,
        'Jumlah Komisi': datas[idx].reward_profit,
      })
    }
    setData(listData)
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
    setRewardDetail(dispatch, (pageNumber-1)*10)
  }
  
	useEffect(()=>{
    setDataShown(dataReward.data)
    setPagination({
      offset: dataReward.offset, 
      limit: dataReward.limit, 
      total: dataReward.total, 
    })
	},[dataReward])

	return (
    <>
      <p className={styles.main_title}>
        {pageName}
      </p>
      <Container className={styles.container_2}>
        {data.length > 0 ?
          <BaseTable 
            data={data} 
            pagination={pagination}
            section={"RewardTable"}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
          :
          <>
            <br/>
            <br/>
            <p>
              Curently no Reward data..
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
)(RewardTable)  