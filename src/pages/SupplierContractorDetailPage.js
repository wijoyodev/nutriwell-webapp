import React, { useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { setMainSupplierContractor } from '../store/actions/supplierAction'
import NewSupplierContractor from "../components/NewSupplierContractor/NewSupplierContractor";

const SupplierContractorDetailPage = ({ dispatch, dataSupplier }) => {
  const { suppContId } = useParams()
  const [shipyardName, setShipyardName] = useState("")
  const [dataSupCont, setDataSupCont] = useState(null)
  const [marineContractor, setMarineContractor] = useState(null)
  const [marineSupplier, setMarineSupplier] = useState(null)

  useEffect(()=>{
    if( dataSupplier.mainSuppContResp !== null ){
      const data = dataSupplier.mainSuppContResp
      setDataSupCont(data)
      setShipyardName(data.companyName)
      if( data.contractor ){
        setMarineContractor(data.contractor)
      }
      if( data.supplier ){
        setMarineSupplier(data.supplier)
      }
      // setLoading(false)
    }
  },[dataSupplier.mainSuppContResp])


  useEffect(()=>{
    setMainSupplierContractor(dispatch, suppContId)
  },[])

  return (    
    dataSupCont &&
    <div className="container_right_form">
      <NewSupplierContractor 
        pageName={shipyardName} 
        pageFor={"detail"}
        section={"update"}
        dataSupCont={dataSupCont}
        marineContractor={marineContractor}
        marineSupplier={marineSupplier}
        suppContId={suppContId}
      />
    </div>
  );
};

const storage = state => {
  return {
    dataSupplier: state.supplier,
  };
};

export default connect(
  storage
)(SupplierContractorDetailPage)