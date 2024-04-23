import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
// import { useMediaQuery } from 'react-responsive'

const WaitVerificationPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <>
      <Row className="verif_container">
        <Col>
          <h1 className="title_verif"> We Got Your Request </h1>
          <p>
            <br/>
            Hi, (PIC NAME) 
            <br/>
            <br/>
            Thankyou for registering (Company Name) to GAPAL. We are reviewing your account and will get 
            back to you in 2 working days. Please contact us at email@gapal.com if you have any concern 
            or update regarding your account. Have a nice day!
            <br/>
            <br/>
            Sincerely,
            <br/>
            GAPAL
          </p>
        </Col>
      </Row>
    </>
  );
};

export default WaitVerificationPage;
