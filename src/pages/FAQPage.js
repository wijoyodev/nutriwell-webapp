import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import FAQTable from '../components/Table/FAQTable'

const FAQPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
  },[])

  return (    
    <div className="container_right_form">
      <FAQTable
        pageName={"FAQ"}
        linkAddNew={"../newFaq"}
      />
    </div>
  );
};

export default FAQPage;
