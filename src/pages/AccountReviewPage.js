import React, { useEffect } from "react";
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
// import { useMediaQuery } from 'react-responsive'

const AccountReviewPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <>
      <Row className="verif_container">
        <Col>
          <p className="text-center">
            <img src={"/images/reviewing.png"}/>
            <br/>
            <br/>
            Thanks for registering to GAPAL!
            <br/>
            We are reviewing your account and will get back to you in 2 working days.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AccountReviewPage;
