import React, { useEffect } from "react";
import OrderManagementTable from '../components/Table/OrderManagementTable'

const OrderManagementPage = () => {

  useEffect(()=>{
    localStorage.setItem("pagePos","OrderManagement")
  },[])

  return (    
    <div className="container_right_form">
      <OrderManagementTable
        pageName={"Order Management"}
        linkAddNew={""}
      />
    </div>
  );
};

export default OrderManagementPage;
