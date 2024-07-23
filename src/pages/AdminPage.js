import React, { useEffect } from "react";
import AdminTable from '../components/Table/AdminTable'

const AdminPage = () => {
  useEffect(()=>{
    localStorage.setItem("pagePos","AdminPage")
  },[])

  return (    
    <div className="container_right_form">
      <AdminTable
        pageName={"Admin"}
        linkAddNew={"../newShipyardOwner"}
      />
    </div>
  );
};

export default AdminPage;
