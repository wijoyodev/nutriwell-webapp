import React, { useEffect } from "react";
import MemberTable from '../components/Table/MemberTable'

const MemberPage = () => {
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
