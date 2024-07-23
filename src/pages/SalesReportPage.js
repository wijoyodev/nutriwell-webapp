import React, { useEffect } from "react";
import SalesReportTable  from '../components/Table/SalesReportTable'

const SalesReportPage = () => {
  useEffect(()=>{
    localStorage.setItem("pagePos","SalesReport")
  },[])

  return (    
    <div className="container_right_form">
      <SalesReportTable 
        pageName={"Sales Report"}
        linkAddNew={""}
      />
    </div>
  );
};

export default SalesReportPage;
