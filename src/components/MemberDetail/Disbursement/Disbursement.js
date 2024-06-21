import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, } from 'react-bootstrap'
import styles from './Disbursement.module.scss'
import { useParams } from 'react-router-dom';
import FieldHandler from '../../MainFormMember/FieldHandler'
import { connect } from "react-redux";
import DisbursementMemberTable from "../../Table/MemberDetail/DisbursementMemberTable";
import { setDisbursementGeneral } from '../../../store/actions/memberAction'

const Disbursement = ({
  dispatch, 
  dataMember,
}) => {
  const { memberId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [onHold, setOnHold] = useState(0);
  const [withDrawn, setWithDrawn] = useState(0);
  const [dataDisbursement, setDataDisbursement] = useState("");
  
  const setData = (data) => {
    setWithDrawn(data?.disburse_success?.total_value)
    setOnHold(data?.disburse_pending?.total_value)
    setDataDisbursement(data)
    setIsLoading(false)
  }

  const dataForm = [
    {
      label: "Berhasil Ditarik",
      type: "labelWithValue",
      spaceMd: "4",
      spaceXs: "4",
      value: withDrawn,
      withCurrency: true,
    },{
      label: "Saldo Tertahan",
      type: "labelWithValue",
      spaceMd: "4",
      spaceXs: "4",
      value: onHold,
      withCurrency: true,
    }
  ]

  useEffect(()=>{
    if( dataMember.disbursementGeneralResp){
      setData(dataMember.disbursementGeneralResp)
    }
  },[dataMember.disbursementGeneralResp])

  useEffect(()=>{
    setDisbursementGeneral(dispatch, memberId, 0)
	},[dispatch, memberId])
  
	return (
    isLoading === false &&
    <>
      <Container className={styles.container}>
        <Row>
          <Col className={styles.container_about} xs={12}>
            <Form noValidate >
              <Row className={styles.field_container}>
                {dataForm.map( (item, index)=>{
                  return <FieldHandler item={item} index={index} key={index}/>
                })}
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <DisbursementMemberTable 
            dataDisbursement={dataDisbursement} 
            setDisbursementGeneral={setDisbursementGeneral} 
            dispatch={dispatch}
          />
        </Row>
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
)(Disbursement)
