import React, { useEffect, useState } from "react";
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";
import styles from './LoginRegister.module.scss'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLeft } from 'react-icons/ai';
import ImageUploading from "react-images-uploading";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const FieldHandlerLogin = ({
  item, 
  index
}) => {
	const isWebMobile = useMediaQuery({ query: '(max-width: 600px)' })
	const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate()
	
  const handleShowPass = () => {
    let curr = showPassword
    setShowPassword(!curr)
  }

	useEffect(()=>{
	},[])
  
  if (item.type === "title"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}> 
        <p className={styles.main_title}>
          {item.label}
        </p>
     </Col>
    )
  } else if (item.type === "sub_title"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} > 
        <p className={styles.sub_title}>
          {item.label}
        </p>
     </Col>
    )
  } else if (item.type === "title2"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}> 
        <p className={styles.main_title_2}>
          {item.label}
        </p>
     </Col>
    )
  } else if (item.type === "desc"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}> 
        <p className={styles.sub_title}>
          {item.label}
          <br/> <strong> +6281234567890. </strong>
        </p>
     </Col>
    )
  } else if (item.type === "desc_bottom"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}> 
        <p className={styles.otp_desc}> 
          {item.label}
          <br/>
          <a>
            <u> <strong> {item.link} </strong> </u>
          </a>
        </p>
     </Col>
    )
  } else if (item.type === "text"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}> {item.label} </Form.Label>
        <InputGroup hasValidation className="mb-2">
          <Form.Control
            className={item.notEditable ? styles.field_form_disabled  : styles.field_form}
            placeholder={item.placeholder}
            aria-label="name"
            onChange={(e)=>item.action(e.target.value)}
            aria-describedby="basic-addon1"
            value={item.value}
            type={item.isNumberOnly ? "number": ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            {item.label} is required
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    )
    
  } else if (item.type === "separator"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <p className={styles.separator}>
          or
        </p>
      </Col>
    )
  } else if (item.type === "button"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Button className={styles.login_button} type="submit" onClick={(e)=>item.action(e)}>
          {item.label}
        </Button>
      </Col>
    )
  } else if (item.type === "button_submit"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Button className={styles.login_button} type="submit" >
          {item.label}
        </Button>
      </Col>
    )
  } else if (item.type === "button_white"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Link to={item.link}>
          <Button className={styles.create_account} type="submit">
            {item.label}
          </Button>
        </Link>
      </Col>
    )
  } else if (item.type === "textarea") {
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <InputGroup >
          <Form.Control
            className={styles.field_form}
            as="textarea"
            placeholder={item.placeholder}
            style={{ height: '100px' }}
          />
        </InputGroup>
      </Col>
    )
  } else if (item.type === "LABEL"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <p htmlFor="basic-url" className={styles[item.style]}>{item.label}</p> 
      </Col>
    )
  } else if (item.type === "SPACE"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        &nbsp;
      </Col>
    )
  } else if (item.type === "link"){
    return (
      item.linkExternal ?
        <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
          <a href={item.link}>
            <p className={styles[item.style]}> {item.label} </p>
          </a>
        </Col>
      :
        <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
          <Link to={item.link}>
            <p className={styles[item.style]}> {item.label} </p>
          </Link>
        </Col>
    )
  } else if (item.type === "password"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <InputGroup hasValidation className="mb-1">
          <Form.Control 
            className={styles.field_form_password}
            type={showPassword ? "text" : "password"} 
            placeholder={item.placeholder}
            onChange={(e)=>item.action(e.target.value)}
            required
          />
          <InputGroup.Text id="basic-addon2" className={styles.eye_container} onClick={ ()=>handleShowPass()}>
            { showPassword ?  <AiOutlineEye/> : <AiOutlineEyeInvisible/> }
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            {item.label} is required
          </Form.Control.Feedback>
        </InputGroup >
      </Col>
    )
  } 
};

export default FieldHandlerLogin;
