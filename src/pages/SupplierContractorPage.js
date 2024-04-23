import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import SupplierContractorTable from '../components/Table/SupplierContractorTable'

const SupplierContractorPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <SupplierContractorTable
        pageName={"Supplier and Contractor"}
        linkAddNew={"../newSupplierContractor"}
      />
    </div>
  );
};

export default SupplierContractorPage;
