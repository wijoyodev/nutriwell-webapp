import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import {  useLocation } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import { useNavigate } from "react-router-dom";

const NotFoundPage = ({
}) => {
  const navigate = useNavigate()
  
	useEffect(()=>{
    if( localStorage.getItem('username') ){
      setTimeout(() => { 
        navigate('/dashboard');
      }, 2000)
    } else {
      setTimeout(() => { 
        navigate('/');
      }, 2000)
    }
	},[])

	return (
		<div className="container_right_form vh-100">
      <Row  className="not_found_container">
        <Col xs="12"  className="box_company_listed text-center">
          <img height={"120px"} width={"120px"} src={"/images/emptyStateGrey.png"}/>
          <h3>
            Page not found
          </h3>
          <p>
            <br/>
            you will be redirect to home shortly
          </p>
        </Col>
      </Row>
		</div>
	);
};

export default NotFoundPage;
