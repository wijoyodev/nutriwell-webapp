import React, { useState } from "react";
import { Row, Col, Form, Button  } from 'react-bootstrap'
import styles from './LoginRegister.module.scss'
import { checkResponseMessage } from "../../helper/helper";
import FieldHandlerLogin from "./FieldHandlerLogin";

const DeleteRequest = ({
  dataField,
}) => {
  const [validated, setValidated] = useState(false);
  const onClickSubmit = (e) => {
    e.preventDefault();
    checkResponseMessage(true, 'Success', 'Your request has been sent. Please wait for our admin to handle your request');
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      onClickSubmit(event)
    }
    setValidated(true);
  };

	return (
		<Col className={"col-md-9"}>
      <br/>
      <h2>
        Delete Request
      </h2>
      <p className={styles.privPol}>
        By deleting your account, your orders data will no longer be available in the application.
        
        Please input the form below to request for account deletion:
        <br/>
        <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {dataField.map( (item, index)=>{
              return <FieldHandlerLogin item={item} index={index} key={index}/>
            })}
            </Form>
          </Row>
      </p>
		</Col>
	);
};

export default DeleteRequest;
