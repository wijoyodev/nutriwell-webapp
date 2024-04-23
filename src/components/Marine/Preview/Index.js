import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './Index.module.scss'
import { BsBatteryHalf, BsCircleFill, BsCircle  } from 'react-icons/bs'
import SimpleImageSlider from "react-simple-image-slider";
import { SlTarget } from "react-icons/sl"
import { AiOutlineMinus } from "react-icons/ai"
import About from './About/About'

const Preview = ({
}) => {

  const [position, setPosition] = useState("Marine Supplier")
  
  const images = [
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
    { url: "/images/ship3.png" },
  ];


  useEffect(()=>{
	},[])

	return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col xs={{span:6, offset:5}} className={styles.phone_container} >
            <img className={styles.frame_phone} height={"120px"} width={"120px"} src={"/images/phone_frame.png"}/>
            <Row className={styles.content_phone}>
              <Col xs='12' className="pl-0">
                <Row className={styles.phone_header}>
                  <Col xs='4' className="text-left">
                    <BsCircleFill/>
                    <BsCircleFill/>
                    <BsCircleFill/>
                    <BsCircle/>
                    <BsCircle/>
                  </Col>
                  <Col xs='4' className="text-center">
                    <p>
                      9:30 AM
                    </p>
                  </Col>
                  <Col xs='4' className="text-right">
                    <p>
                      42% <BsBatteryHalf/>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <SimpleImageSlider
                      width={266}
                      height={224}
                      style={{ padding: '0px 2px'}}
                      images={images}
                      showBullets={true}
                    />
                  </Col>
                </Row>
                <Row className={styles.description}>
                  <Col xs='12'>
                    <Row className={styles.separator}>
                      <Col xs='12' className="text-center">
                        <p>
                          <AiOutlineMinus color="#c0c4c7"className={styles.separator_icon}/>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className={styles.ship_name}>
                          Paxocean Shipyard Nanindah
                        </p>
                        <p className={styles.ship_location}>
                          <SlTarget/> &nbsp; Pelabuhan Tanjung, Jakarta
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.navbar}>
                  <Col 
                    xs="6" 
                    className={position === "Marine Supplier" ? styles.nav_item_active : styles.nav_item}
                    onClick={()=>setPosition("Marine Supplier")}
                  >
                    Marine Supplier
                  </Col>
                  <Col 
                    xs="6" 
                    className={position === "Marine Contractor" ? styles.nav_item_active : styles.nav_item}
                    onClick={()=>setPosition("Marine Contractor")}
                  >
                    <p> Marine Contractor </p>
                  </Col>
                </Row>
                <Row className={styles.section_selected}>
                  <Col>
                    {position === "Marine Supplier" && <About/>} 
                    {position === "Marine Contractor" &&  <p> Marine Contractor</p>} 
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
	);
};

export default Preview;
