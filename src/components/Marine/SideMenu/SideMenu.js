import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import styles from './SideMenu.module.scss'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { RiShipLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { BiTrashAlt } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const SideMenu = ({
  marineSupplier,
  selectedMenu,
  setSelectedMenu,
}) => {

  const [toggleList, setToggleList] = useState(false)

	useEffect(()=>{
	},[])

	return (
		<Row>
      <Col xs="12">
        <p className={styles.shipyard_name} onClick={ ()=>setToggleList(!toggleList) }>
          {marineSupplier.companyName}
        </p>
        <Row>
          <Col xs="12" 
            className={ selectedMenu === "Marine Supplier" ? styles.menu_bar_blue : styles.menu_bar } 
            onClick={()=>setSelectedMenu("Marine Supplier")}
          >
            <Row className={styles.menu_bar_text}>
              <Col xs="10">
                <p>
                  {"Marine Supplier"}
                </p>
              </Col>
              <Col xs="1">
                  <AiOutlineRight/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="12" 
            className={ selectedMenu === "Marine Contractor" ? styles.menu_bar_blue : styles.menu_bar } 
            onClick={()=>setSelectedMenu("Marine Contractor")}
          >
            <Row className={styles.menu_bar_text}>
              <Col xs="10">
                <p>
                  {"Marine Contractor"}
                </p>
              </Col>
              <Col xs="1">
                  <AiOutlineRight/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
		</Row>
	);
};

export default SideMenu;
