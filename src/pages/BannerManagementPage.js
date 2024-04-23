import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import BannerTable from '../components/TableDnD/BannerTable'

const BannerManagementPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <BannerTable
        pageName={"Banner Management"}
        linkAddNew={"../newBanner"}
      />
    </div>
  );
};

export default BannerManagementPage;
