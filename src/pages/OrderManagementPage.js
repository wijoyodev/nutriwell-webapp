import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import OrderManagementTable from '../components/Table/OrderManagementTable'

const OrderManagementPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

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
