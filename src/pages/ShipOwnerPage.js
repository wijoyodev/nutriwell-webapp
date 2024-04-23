import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import ShipOwnerTable from '../components/Table/ShipOwnerTable'

const ShipOwnerPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <ShipOwnerTable
        pageName={"Ship Owner"}
        linkAddNew={"../newShipOwner"}
      />
    </div>
  );
};

export default ShipOwnerPage;
