import React, { useState } from "react";
import { Row, Col, Form  } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import styles from './LoginRegister.module.scss'
import FieldHandlerLogin from "./FieldHandlerLogin";
import PrivacyPolicy from "./PrivacyPolicy"
import DeleteRequest from "./DeleteRequest";

const LoginRegister = ({
  dataField,
  linkLogin,
  onSubmit,
  contentType,
}) => {

	const [showPassword, setShowPassword] = useState(false);
	const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);
	
  const handleShowPass = () => {
    let curr = showPassword
    setShowPassword(!curr)
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

  const doLogin = () => {
    localStorage.setItem('username', "userTest");
    navigate(linkLogin);
  }

	return (
		<>
      <Row className="mr-0 ml-0">
        {
          contentType === 'privacyPolicy' ?
          <>
            <Col xs="6" className={styles.left_image_half}>
            </Col>  
            <PrivacyPolicy />
          </>
          : contentType === 'deleteRequest' ?
          <>
            <Col xs="6" className={styles.left_image_half}>
            </Col>  
            <DeleteRequest dataField={dataField} />
          </>
          :
            !isWeMobile &&
            <Col xs="6" className={styles.left_image}>
            </Col>
            
        }
        <Col xs={isWeMobile ? "12" : "6"} className={styles.right_container}>
          { isWeMobile &&
            <Row>
              <Col xs={{span:"6", offset:"4"}} className="mb-3">
                {/* <img height={"42px"} width={"80px"} src={"/images/logoBlue.png"}/> */}
              </Col>
            </Row>
          }
          <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {dataField.map( (item, index)=>{
              return <FieldHandlerLogin item={item} index={index} key={index}/>
            })}
            </Form>
          </Row>
        </Col>
      </Row>
		</>
	);
};

export default LoginRegister;
