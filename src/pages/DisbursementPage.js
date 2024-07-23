import React, { useEffect } from "react";
import DisbursementTable from '../components/Table/DisbursementTable'

const DisbursementPage = () => {
  useEffect(()=>{
    localStorage.setItem("pagePos","OrderManagement")
  },[])

  return (    
    <div className="container_right_form">
      <DisbursementTable
        pageName={"Disbursement"}
        linkAddNew={""}
      />
    </div>
  );
};

export default DisbursementPage;
