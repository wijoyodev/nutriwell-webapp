import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import DisbursementTable from '../components/Table/DisbursementTable'

const DisbursementPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
    localStorage.setItem("pagePos","OrderManagement")
  },[])

  return (    
    <div className="container_right_form">
      <DisbursementTable
        pageName={"Disbursement"}
        linkAddNew={"../newShipyardOwner"}
      />
    </div>
  );
};

export default DisbursementPage;
