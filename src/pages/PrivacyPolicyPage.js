import React, { useEffect, useState } from "react";
import LoginRegister from '../components/LoginRegister/LoginRegister'
import { connect } from "react-redux";

const PrivacyPolicyPage = () => {

  return (    
    <>
      <LoginRegister
        dataField={[]}
        privacyPolicy={true}
        pageName={"Login as Admin"}
      />
    </>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(PrivacyPolicyPage)
