import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { FaHome, FaTools, FaChartBar } from 'react-icons/fa'
import { FaMoneyBills } from 'react-icons/fa6'
import { RiShipFill, RiAccountCircleFill } from 'react-icons/ri'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { CiImageOn } from 'react-icons/ci'
import { BsFillTagFill } from 'react-icons/bs'
import { MdPeople } from 'react-icons/md'

import { CgProfile } from 'react-icons/cg'
import {  Link } from 'react-router-dom';
import styles from './SideMenu.module.scss'

const SideMenu = () => {

  const [menuList, setMenuList] = useState([])
  const defaultMenu = [{
    title: "Order Management",
    icon: <IoDocumentTextOutline/>,
    isActive: false,
    type:"menu",
    link:"../orderManagement"
  },{
    title: "Sales Report",
    icon: <FaChartBar/>,
    isActive: false,
    type:"menu",
    link:"./salesReport"
  },{
    title: "Disbursement",
    icon: <FaMoneyBills/>,
    isActive: false,
    type:"menu",
    link:"./disbursement"
  },{
    title: "Banner Management",
    icon: <FaTools/>,
    isActive: false,
    type:"menu",
    link:"./bannerManagement"
  },{
    title: "Member Management",
    icon: <MdPeople/>,
    isActive: false,
    type:"menu",
    link:"./memberManagement"
  },{
    title: "Admin Management",
    icon: <CgProfile/>,
    isActive: false,
    type:"menu",
    link:"./adminManagement"
  }
  // ,{
  //   title: "Supplier Banner",
  //   icon: <CiImageOn/>,
  //   isActive: false,
  //   type:"menu",
  //   link:"../supplierBanner"
  // },{
  //   title: "Contractor Banner",
  //   icon: <BsFillTagFill/>,
  //   isActive: false,
  //   type:"menu",
  //   link:"../contractorBanner"
  // },{
  //   title: "Contact Information",
  //   icon: <RiAccountCircleFill/>,
  //   isActive: false,
  //   type:"menu",
  //   link:"./contactInformation"
  // }
  // ,{
  //   title: "MASTER DATA",
  //   icon: <FaTools/>,
  //   type:"title",
  // }
  // ,{
  //   title: "FAQ",
  //   icon: <RiErrorWarningFill/>,
  //   isActive: false,
  //   type:"menu",
  //   link:"./faq"
  // }
]
  
  const selectMenu = (index) => {
    let currMenu = [...defaultMenu];
    currMenu[index].isActive = !currMenu[index].isActive 
    setMenuList(currMenu)
  }

  useEffect(()=>{
    setMenuList(defaultMenu)
  },[])

  // useEffect(()=>{
  //   selectMenu(0)
  // },[menuList])


	return (
    <Container className={styles.container}>
      { menuList.length > 0 && <>
        <Row>
          <Col className={styles.logo}>
            <a href="/dashboard">
              <img height={"238px"} width={"238px"} src={"/images/main.png"}/>
            </a>
          </Col>
        </Row>
        {
          menuList.map((data, index)=>(
            data.type === "menu" ? 
              <Row key={index} onClick={ ()=>selectMenu(index) }>
                <Link to={data.link} className={styles.link}>
                  <Col xs="12" className={data.isActive ? styles.list_menu_active : styles.list_menu}>
                    <p> {data.icon} &nbsp;&nbsp; {data.title} </p>
                  </Col>
                </Link>
              </Row>
            :
              // data.type === "title" ? 
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
