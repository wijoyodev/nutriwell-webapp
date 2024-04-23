import React, { useEffect } from "react";
import 'rsuite/dist/rsuite.min.css';
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = () => {

	useEffect(()=>{
	},[])

	return (
		<div className="container_right_form vh-100">
      <Dashboard/>
		</div>
	);
};

export default DashboardPage;
