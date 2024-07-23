import React from "react";
import BannerTable from '../components/TableDnD/BannerTable'

const BannerManagementPage = () => {

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
