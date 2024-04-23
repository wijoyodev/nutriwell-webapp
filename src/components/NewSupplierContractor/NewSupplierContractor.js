import React, { useEffect, useState } from "react";
import { Row, Col, Button } from 'react-bootstrap'
import styles from './NewSupplierContractor.module.scss'
import { AiOutlineCheck } from 'react-icons/ai'
import { connect } from "react-redux";
import GeneralInfo from './GeneralInfo/GeneralInfo'
import MarineSupplierInfo from "./MarineSupplierInfo/MarineSupplierInfo";
import MarineContractorInfo from "./MarineContractorInfo/MarineContractorInfo";
import Swal from 'sweetalert2'
import { setVerifyUser, resetVerifyUser, setForgotPassword } from '../../store/actions/loginRegisterAction'

const NewSupplierContractor = ({
  pageName,
  dispatch, 
  dataLoginRegister, 
  pageFor,
  section,
  dataSupCont,
  marineSupplier,
  marineContractor,
  suppContId,
}) => {
  const [position, setPosition] = useState("GeneralInfo")
  const [isActive, setIsActive] = useState(false);
  const [isVerified, setIsVerified] = useState({isVerified:false});

  const doResendPass = (e) => {
    e.preventDefault()
    setForgotPassword(dispatch, dataSupCont.account.email, isVerified.role)
  }
  
  const doVerify = (e) => {
    e.preventDefault()
    Swal.fire({
      text: "Are you sure want to verify this user?",
      confirmButtonText: 'Yes',
      confirmButtonColor: '#a9acaf',
      cancelButtonText: 'No',
      cancelButtonColor: '#163b55',
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const data ={
          email: isVerified.email, 
          role: isVerified.role
        }
        setVerifyUser(dispatch, data)
      }
    })
  }

  useEffect(()=>{
    if( dataLoginRegister.verifyUserResp ){
      resetVerifyUser(dispatch)
    }
  },[dataLoginRegister.verifyUserResp])

  useEffect(()=>{
    if( pageFor === "detail" ){
      setIsVerified(dataSupCont.account)
    }
  },[])

	return (
    isVerified && 
    <div className={styles.container}>
      <Row className="justify-content-between">
        <Col xs={{ span: 9 }}>
          <p className={styles.main_title_2}>
            {pageName}
            &nbsp; &nbsp; &nbsp; 
            <br/>
            { isActive === true && 
              <font className={styles.label_active}>
                Active
              </font>
            }
            &nbsp;
            { isActive === true && 
              <font className={styles.label_inactive}>
                Inactive
              </font>
            }
            &nbsp;
            { isVerified.isVerified ?
              <font className={styles.label_verified}>
                <AiOutlineCheck/> &nbsp; Verified
              </font>
              :
              <font className={styles.label_not_verified}>
                Not Verified
              </font>
            }
          </p>
        </Col>
        { pageFor === "detail" && 
          <Col className={"pt-4"}>
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
        }
      </Row>
      <Row className={styles.navbar}>
        <Col 
          xs="4" 
          className={position === "GeneralInfo" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>{
          //   if(section === "update"){
          //     setPosition("GeneralInfo")
          //   }}
          // }
          >
          <p> General Information </p>
        </Col>
        <Col 
          xs="4" 
          className={position === "MarineSupplierInfo" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>{
          //   if(section === "update"){
          //     setPosition("MarineSupplierInfo")
          //   }}
          // }
          >
          <p> Marine Supplier Information </p>
        </Col>
        <Col 
          xs="4" 
          className={position === "MarineContractorInfo" ? styles.nav_item_active : styles.nav_item}
          // onClick={()=>{
          //   if(section === "update"){
          //     setPosition("MarineContractorInfo")
          //   }}
          // }
          >
          <p> Marine Contractor Information </p>
        </Col>
        {/* <Col xs="6" className={styles.nav_item}>
          <p> &nbsp; </p>
        </Col> */}
      </Row>
      <Row className={styles.section_selected}>
        <Col>
          {position === "GeneralInfo" && <GeneralInfo pageFor={pageFor} setPosition={setPosition} dataSupCont={dataSupCont} section={section} suppContId={suppContId}/>} 
          {position === "MarineSupplierInfo" && <MarineSupplierInfo setPosition={setPosition} marineSupplier={marineSupplier} section={section} suppContId={suppContId}/> }
          {position === "MarineContractorInfo" && <MarineContractorInfo setPosition={setPosition} marineContractor={marineContractor} section={section} suppContId={suppContId}/>} 
        </Col>
      </Row>
    </div>
	);
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister,
  };
};

export default connect(
  storage
)(NewSupplierContractor)
