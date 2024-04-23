import React, { useEffect } from "react";
import AdminManagementTable from '../components/Table/AdminManagementTable'

const AdminManagementPage = () => {

  return (    
    <div className="container_right_form">
      <AdminManagementTable
        pageName={"Admin Management"}
        linkAddNew={"../newAdminPage"}
      />
    </div>
  );
};

export default AdminManagementPage;
