import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, Table } from 'react-bootstrap';
import 'rsuite/dist/rsuite.min.css';
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from "react-router-dom";
import styles from './BaseTable.module.scss';
import BaseTable from "./BaseTable";


const FAQTable = ({
  pageName,
  linkAddNew,
}) => {

  const totalPages = 17;

  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState([
    {
      id:0,
      title:"Who is Gapal?",
      description:"Enim sagittis enim porta tincidunt commodo turpis.",
    },{
      id:1,
      title:"Who is Gapal?",
      description:"Enim sagittis enim porta tincidunt commodo turpis.",
    },{
      id:2,
      title:"Who is Gapal?",
      description:"Enim sagittis enim porta tincidunt commodo turpis.",
    },{
      id:3,
      title:"Who is Gapal?",
      description:"Enim sagittis enim porta tincidunt commodo turpis.",
    },{
      id:4,
      title:"Who is Gapal?",
      description:"Enim sagittis enim porta tincidunt commodo turpis.",
    }
  ])

  const handlePageChange = (pageNumber) => {
    let currPage = pageName
    setActivePage(currPage)
  }

	useEffect(()=>{
	},[])

	return (
    <Container className={styles.container}>
      <Row>
        <Col xs="9">
          <p className={styles.main_title}>
            {pageName}
          </p>
        </Col>
        <Col xs="3">
          <Link to={linkAddNew}>
            <Button className={styles.save_button_2}>
              {"New "+pageName}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs="3">
          <InputGroup>
            <InputGroup.Text id="basic-addon2" className={styles.icon_search}>
              {<BiSearchAlt/>}
            </InputGroup.Text>
            <Form.Control 
              className={styles.field_search}
              type={"text"} 
              placeholder={"Search"}
            />
          </InputGroup >
        </Col>
        <Col xs="3">
          <Form.Select aria-label="Default select example" className={styles.field_form} >
            <option>{"Select Region"}</option>
            <option>{"Jakarta Utara"}</option>
            <option>{"Bekasi"}</option>
            <option>{"Cilegon"}</option>
          </Form.Select>
        </Col>
        <Col xs="4">
          <Button className={styles.save_button}>
            {"Apply"}
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          <Button className={styles.cancel_button}>
            {"Clear"}
          </Button>
        </Col>
      </Row>
      <BaseTable  
        data={data} 
        totalPages={totalPages}
        linkDetail={"../faqDetail/"}
      />
    </Container>
	);
};

export default FAQTable;
