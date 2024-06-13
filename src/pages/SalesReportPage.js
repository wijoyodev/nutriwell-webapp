import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import SalesReportTable  from '../components/Table/SalesReportTable'

const SalesReportPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

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
