import React, { useEffect } from "react";
import { Row, Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CompanyListedPage = () => {
  const navigate = useNavigate()

	useEffect(()=>{
    setTimeout(() => { 
      navigate('/marine');
    }, 2000)
	},[])

	return (
		<div>
      <Row className="company_listed_container">
        <Col xs={{span:"4", offset:"4"}} className="box_company_listed">
          <img height={"100%"} width={"100%"} src={"/images/completeState.png"}/>
          <p className="ft-10 text-center">
            <br/>
            Congrats! Your company is now listed.
          </p>
        </Col>
      </Row>
		</div>
	);
};

export default CompanyListedPage;
