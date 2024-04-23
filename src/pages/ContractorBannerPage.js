import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import ContractorBannerTable from '../components/TableDnD/ContractorBannerTable'

const ContractorBannerPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <ContractorBannerTable
        pageName={"Contractor Banner"}
        linkAddNew={"../newContractorBanner"}
      />
    </div>
  );
};

export default ContractorBannerPage;
