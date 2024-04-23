import React, { useEffect, useState } from "react";
import { Row, Col, Form } from 'react-bootstrap'
// import { useMediaQuery } from 'react-responsive'
import NewShipyard from "../components/NewShipyard/NewShipyard";

const ShipyardDetailPage = () => {
  const [position, setPosition] = useState("About")
  const [isActive, setIsActive] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [shipyardName, setShipyardName] = useState("Shipyard Details")
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <NewShipyard 
        pageName={shipyardName} 
        pageFor={"detail"}
        isActive={isActive}
        isVerified={isVerified}
      />
    </div>
  );
};

export default ShipyardDetailPage;
