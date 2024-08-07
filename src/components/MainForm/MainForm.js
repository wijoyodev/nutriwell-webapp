import React, { useState } from "react";
import { Row, Col, Form, } from 'react-bootstrap'
import styles from './MainForm.module.scss'
import { connect } from "react-redux";
import 'rsuite/dist/rsuite.min.css';
import FieldHandler from './FieldHandler'

const MainForm = ({
  pageName,
  onClickFunc,
  dataForm,
  pageFor,
  trackShipment,
  status,
  orderId,
  onSubmit,
  whiteBackground,
}) => {
  const [validated, setValidated] = useState(false);

  const printStatusLabel = (status) => {
    if( pageName === "Order Detail" ){
      if( status === 3 ){ // STATUS : Selesai
        return <font className={`${styles.statusDone} ${styles.buttonStatus}`}> Selesai </font>
      } else if( status === 0 ){ // STATUS : Belum Bayar
        return <font className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Belum Bayar </font>
      } else if( status === 1 ){ // STATUS : Dikemas
        return <font className={`${styles.statusPacking} ${styles.buttonStatus}`}> Dikemas </font>
      } else if( status === 2 ){ // STATUS : Dikirim
        return <font className={`${styles.statusDelivered} ${styles.buttonStatus}`}> Dikirim </font>
      } else if( status === 4 ){ // STATUS : Dibatalkan
        return <font className={`${styles.statusCancelled} ${styles.buttonStatus}`}> Dibatalkan </font>
      } else {
        return <font className={`${styles.statusDone} ${styles.buttonStatus}`}> Selesai </font>
      }
    }else if( pageName === "Disbursement Detail" ){
      if( status === "Berhasil" || status === "COMPLETED" ){
        return <font className={`${styles.statusDone} ${styles.buttonStatus}`}> Berhasil </font>
      } else if( status === "Pending" || status === "PENDING" ){
        return <font className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Pending </font>
      } else {
        return <font className={`${styles.statusNotPaid} ${styles.buttonStatus}`}> Pending </font>
      }
    }
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      onSubmit(event)
    }
    setValidated(true);
  };

	return (
		<>
      { pageFor === "detail" && 
      <Row>
        <Col xs={9}>
          <p className={styles.main_title_2}>
            { orderId ? 
              `${pageName} #${orderId}`
              :
              pageName
            }
            &nbsp; &nbsp; &nbsp;
            { printStatusLabel(status) }
            {/* { isActive?
              <font className={styles.label_active}>
                Active
              </font>
              :
              <font className={styles.label_inactive}>
                Inactive
              </font>
            } */}
            {/* &nbsp;
            {pageName !== "Admin Detail" && 
              <>
                { isVerified.isVerified ?
                  <font className={styles.label_verified}>
                    <AiOutlineCheck/> &nbsp; Verified
                  </font>
                  :
                  <font className={styles.label_not_verified}>
                    Not Verified
                  </font>
                }
              </>
            } */}
          </p>
        </Col>
      </Row>
      }
      <Row>
        <Col md="12" xs="12">
          <Row>
            {/* { pageFor === "detail" && 
              <Col xs={3}>
                <Row>
                  <Col md={12} xs={12} className={styles.section}>
                    <Button className={styles.cancel_button} onClick={(e)=>doResendPass(e)}>
                      Resend Password
                    </Button>
                  </Col>
                  <br/>
                  { isVerified.isVerified === false &&
                    <Col md={12} xs={12} className={styles.section} onClick={(e)=>doVerify(e)}>
                      <Button className={styles.save_button}>
                        Verifikasi
                      </Button>
                    </Col>
                  }
                </Row>
              </Col>
            } */}
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className={whiteBackground && styles.backgroundWhite}>
            <Row className={styles.field_container}>
              {dataForm.map( (item, index)=>{
                return <FieldHandler item={item} index={index} key={index} onClickFunc={onClickFunc} trackShipment={trackShipment}/>
              })}
            </Row>
          </Form>
        </Col>
      </Row>
		</>
	);
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister,
  };
};

export default connect(
  storage
)(MainForm)

