import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { RiShip2Fill, RiShipLine, RiShipFill } from 'react-icons/ri'
import { TbShip } from 'react-icons/tb'
import { BsFillBagDashFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom';
import styles from './Dashboard.module.scss'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setStatistic } from '../../store/actions/loginRegisterAction'

const Dashboard = ({ dispatch, dataLoginRegister }) => {
  const [data, setData] = useState("");

  const dataCard = [{
    title: "Total Shipyard Owner",
    icon: <RiShip2Fill size={30} color={"#183E58"}/>,
    number: data.shipyardOwnerTotal || 0,
  },{
    title: "Total Ship Owner",
    icon: <RiShipLine size={30} color={"#183E58"}/>,
    number: data.shipOwnerTotal || 0,
  },{
    title: "Total Active Listing Shipyard",
    icon: <RiShipFill size={30} color={"#183E58"}/>,
    number: data.shipyardTotalActive || 0,
  },{
    title: "Total Contractor",
    icon: <TbShip size={30} color={"#183E58"}/>,
    number: data.contractorTotal || 0,
  },{
    title: "Total Supplier",
    icon: <BsFillBagDashFill size={30} color={"#183E58"}/>,
    number: data.supplierTotal || 0,
  }]

	useEffect(()=>{
    setStatistic(dispatch)
	},[])

	useEffect(()=>{
    if( dataLoginRegister.statisticResp ){
      setData(dataLoginRegister.statisticResp)
    }
	},[dataLoginRegister.statisticResp])


	return (
		<Container className={styles.container}>
      <Row>
        { dataCard.map((data, index)=>(
          <Col xs={4} key={index} className={"p-3"}>
            <div className={styles.card}>
              <p> {data.icon} </p>
              <p className={styles.title}> {data.title} </p>
              <p className={styles.number}> {data.number} </p>
            </div>
          </Col>
        ))
        }
      </Row>
		</Container>
	);
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(Dashboard)

