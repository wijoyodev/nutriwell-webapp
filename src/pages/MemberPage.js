import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import MemberTable from '../components/Table/MemberTable'

const MemberPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

  useEffect(()=>{
    localStorage.setItem("pagePos","MemberPage")
  },[])

  return (    
    <div className="container_right_form">
      <MemberTable
        pageName={"Member Management"}
        linkAddNew={"./addMember"}
      />
    </div>
  );
};

export default MemberPage;
