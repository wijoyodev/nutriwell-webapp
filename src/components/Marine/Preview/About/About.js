import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import styles from './About.module.scss'

const Preview = ({
}) => {
  
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
          <Col className={styles.container_about}>
            <p className={styles.about}>
              Lorem ipsume dolor si amt, consecture adispi
              Lorem ipsume dolor si amt, consecture adispi
            </p>
            <p className={styles.read_more}>
              Read More
            </p>
            <p className={styles.title}>
              Company Name
            </p>
            <p className={styles.desc}>
              Number of crane : 9
              <br/>
              Number of crane : 9
              <br/>
              Number of crane : 9
            </p>
          </Col>
        </Row>
        <Row>
          <Button className={styles.contact}>
            Contact shipyard
          </Button>
        </Row>
        <Row>

        </Row>
      </Container>
    </>
	);
};

export default Preview;
