import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { FaTools, FaChartBar } from 'react-icons/fa'
import { FaMoneyBills } from 'react-icons/fa6'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdPeople } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import {  Link } from 'react-router-dom';
import styles from './SideMenu.module.scss'

const SideMenu = () => {

  const [menuList, setMenuList] = useState([])
  const defaultMenu = [{
    title: "Order Management",
    icon: <IoDocumentTextOutline/>,
    type:"menu",
    link:"../orderManagement"
  },{
    title: "Sales Report",
    icon: <FaChartBar/>,
    type:"menu",
    link:"./salesReport"
  },{
    title: "Disbursement",
    icon: <FaMoneyBills/>,
    type:"menu",
    link:"./disbursement"
  },{
    title: "Banner Management",
    icon: <FaTools/>,
    type:"menu",
    link:"./bannerManagement"
  },{
    title: "Product Detail",
    icon: <CgProfile/>,
    type:"menu",
    link:"./productDetail"
  },{
    title: "Member Management",
    icon: <MdPeople/>,
    type:"menu",
    link:"./memberManagement"
  },{
    title: "Admin Management",
    icon: <CgProfile/>,
    type:"menu",
    link:"./adminManagement"
  }
  ] 
  
  const menuAdminPacking = [{
    title: "Order Management",
    icon: <IoDocumentTextOutline/>,
    type:"menu",
    link:"../orderManagement"
  }]
  
  const selectMenu = (index) => {
    localStorage.setItem("activeMenu", index)
  }

  useEffect(()=>{
    if(localStorage.getItem("activeMenu")){
      localStorage.setItem("activeMenu", localStorage.getItem("activeMenu"))
    }else{
      localStorage.setItem("activeMenu", 0)
    }

    if( localStorage.getItem('role') === "3" ){
      setMenuList(menuAdminPacking)
    }else{
      setMenuList(defaultMenu)
    }

  },[])

	return (
    <Container className={styles.container}>
      { menuList.length > 0 && <>
        <Row>
          <Col className={styles.logo}>
            <a href="/orderManagement">
              <img height={"238px"} width={"238px"} src={"/images/main.png"}/>
            </a>
          </Col>
        </Row>
        {
          menuList.map((data, index)=>(
            data.type === "menu" ? 
              <Row key={index} onClick={ ()=>selectMenu(index) }>
                <Link to={data.link} className={styles.link}>
                  <Col xs="12" className={localStorage.getItem("activeMenu") == index ? styles.list_menu_active : styles.list_menu}>
                    <p> {data.icon} &nbsp;&nbsp; {data.title} </p>
                  </Col>
                </Link>
              </Row>
            :
              <Row key={index}>
                <Col xs="12" className={styles.list_menu_title}>
                  <p> {data.title} </p>
                </Col>
              </Row>
          ))
        }
        </>
      }
    </Container>
	);
};

export default SideMenu;
