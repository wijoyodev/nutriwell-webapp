import React, { useEffect } from "react";
// import { useMediaQuery } from 'react-responsive'
import AdminTable from '../components/Table/AdminTable'

const AdminPage = () => {
  // const [progress, setProgress] = useState(true);
  // const isWeMobile = useMediaQuery({ query: '(max-width: 600px)' })

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
