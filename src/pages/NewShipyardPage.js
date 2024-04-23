import React, { useEffect, useState } from "react";
import { Row, Col, Form } from 'react-bootstrap'
// import { useMediaQuery } from 'react-responsive'
import NewShipyard from "../components/NewShipyard/NewShipyard";

const NewShipyardPage = () => {
  const [position, setPosition] = useState("About")
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (
    <div className="container_right_form">
      <NewShipyard pageName={"New Shipyard"} pageFor={"new"}/>
    </div>
  );
};

export default NewShipyardPage;
