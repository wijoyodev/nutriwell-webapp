import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import ShipyardBannerTable from '../components/TableDnD/ShipyardBannerTable'

const ShipyardBannerPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <ShipyardBannerTable
        pageName={"Shipyard Banner"}
        linkAddNew={"../newShipyardBanner"}
      />
    </div>
  );
};

export default ShipyardBannerPage;
