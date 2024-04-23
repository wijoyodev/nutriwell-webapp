import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import OrderManagementTable from '../components/Table/OrderManagementTable'

const ShipyardOwnerPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
    localStorage.setItem("pagePos","About")
  },[])

  return (    
    <div className="container_right_form">
      <OrderManagementTable
        pageName={"Shipyard Owner"}
        linkAddNew={"../newShipyardOwner"}
      />
    </div>
  );
};

export default ShipyardOwnerPage;
