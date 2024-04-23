import React, { useEffect, useState } from "react";
import { Row, Col, Form } from 'react-bootstrap'
// import { useMediaQuery } from 'react-responsive'
import NewSupplierContractor from "../components/NewSupplierContractor/NewSupplierContractor";

const NewSupplierContractorPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <NewSupplierContractor pageName={"New Suppllier and Contractor"} pageFor={"new"}/>
    </div>
  );
};

export default NewSupplierContractorPage;
