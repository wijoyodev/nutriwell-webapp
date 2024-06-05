import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import styles from './MainForm.module.scss'
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSearch } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import ImageUploading from "react-images-uploading";
import { DateRangePicker, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Select from 'react-select'

const FieldHandler = ({
  item, 
  index,
  onClickFunc,
}) => {
  const uploadFile= useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	
  const handleShowPass = () => {
    let curr = showPassword
    setShowPassword(!curr)
  }

  
  const dropdownComponent = (item) =>{
    let data = []
    for( let i=0 ; i<item.dataDropdown.length ; i++ ){
      data.push({value: item.dataDropdown[i], label: item.dataDropdown[i] })
    }

    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <Select placeholder={item.default} options={data} className={styles.field_form_dropdown}/>
      </Col>
    )
  }

	useEffect(()=>{
	},[])

  const sectionFieldHanlder = (item, index) => {
    if(item.type === "date" ){
      return(
        <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
          <Row>
            <Form.Label htmlFor="basic-url" className={styles.filed_label + ' mb-0  pb-0'}>{item.label}</Form.Label>
            <Form.Label htmlFor="basic-url" className={styles.filed_label_info}>
              { new Date(item.value).toLocaleString() }
            </Form.Label>
          </Row>
        </Col>
      )
    }else if(item.type === "text" ){
      return (
        <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
          <Row>
            <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
          </Row>
          <Row>
            <Form.Label htmlFor="basic-url" className={styles.filed_label + ' mb-0  pb-0'}>{item.isCurrency && "Rp. "}{item.value}</Form.Label>
          </Row>
          {console.log("ITEM", item)}
          {console.log("ITEM", item.value)}
          {item.bankInfo &&
            <Row>
              <Form.Label htmlFor="basic-url" className={styles.filed_label_3 + ' mb-0  pb-0'}>{item.valueAccBank}</Form.Label>
              <Form.Label htmlFor="basic-url" className={styles.filed_label_info + ' mb-0'}>{item.valueAccBankNum}</Form.Label>
              <Form.Label htmlFor="basic-url" className={styles.filed_label_info}>{item.valueAccBankName}</Form.Label>
            </Row>
          }
          {item.isPaymentDone &&
            <Row>
              <Form.Label htmlFor="basic-url" className={styles.filed_label + ' mb-0  pb-0'}>{item.paymentMethod}</Form.Label>
              <Form.Label htmlFor="basic-url" className={styles.filed_label_info}>
                {`Dibayar pada ` + new Date(item.detailInfo).toLocaleString()}
              </Form.Label>
            </Row>
          }
          {item.isPaymentDone == false && "-"}
          
          {item.isOnShipping &&
            <Row>
              <Form.Label htmlFor="basic-url" className={styles.filed_label + ' mb-0  pb-0'}>{item.courierType}</Form.Label>
              <Form.Label htmlFor="basic-url" className={styles.filed_label_info}>
                {`No Resi ` + item.shippingNo} 
                &nbsp;
                <u className={styles.link}> Lacak </u>
                <br/>
                {`Terkirim ` + new Date(item.shippingDate).toLocaleString()}
              </Form.Label>
            </Row>
          }
          {item.isOnShipping == false && "-"}
        </Col>
      )
    }else if( item.type === "textCustomer" ){
      return (
        <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
          <Row>
            <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
          </Row>
          <Row>
            <Form.Label htmlFor="basic-url" className={`${styles.filed_label_2} mb-0`}>{item.value.full_name}</Form.Label>
          </Row>
          <Row>
            <Form.Label htmlFor="basic-url" className={`${styles.filed_label} mb-0`}>{item.value.phone_number}</Form.Label>
          </Row>
          <Row>
            <Form.Label htmlFor="basic-url" className={`${styles.filed_label} mb-0`}>{item.value.address_detail}</Form.Label>
          </Row>
        </Col>
      )
    }
  }
  
  if(item.type === "section"){
    return (
      <Col md={12} xs={12} key={index} className={styles.section_wrapper}>
        <Form.Label htmlFor="basic-url" className={styles.field_handler}>{item.label}</Form.Label>
        <Row>
          {item.dataFields.map( ( data, index) => (
            sectionFieldHanlder(data, index)         
          ))}
        </Row>
      </Col>
    )
  } else if(item.type === "sectionTable"){
    return (
      <Col md={12} xs={12} key={index} className={styles.section_wrapper}>
        <Form.Label htmlFor="basic-url" className={styles.field_handler}>{item.label}</Form.Label>
        <Row className={styles.header_table}>
          { item.dataFieldsTitle.map( (item, index) => (
            <Col key={index} md={3} xs={3} className={"p-3"}>
                {item}
              </Col>
            )
          ) }
        </Row>
        {console.log(item.productDetails, "<<ITEM section productDetails")}
        <Row index={index} className={styles.data_table}>
          <Col md={3} xc={3} className={"p-3"}>
            {item.productDetails.product_name}
          </Col>
          <Col md={3} xc={3} className={"p-3"}>
            {item.productDetails.quantity}
          </Col>
          <Col md={3} xc={3} className={"p-3"}>
            {'Rp' + item.productDetails.price}
          </Col>
          <Col md={3} xc={3} className={"p-3"}>
            {'Rp' + item.productDetails.total_price}
          </Col>
        </Row>
        {item.transactionTotalTitle.map( ( data, index) => (
          <Row index={index}>
            <Col md={{ span:3, offset:6 }} xc={{ span:3, offset:6 }} className={"p-3"}>
              {data}
            </Col>
            {console.log ("ITEM", item)}
            { data === "Total yang dapat ditarik" &&
              <Col md={3} xc={3} className={styles.totalPrice + " p-3"}>
                {'Rp' + item?.transactionTotal?.totalPrice}
              </Col>
            }
            { data === "Total" &&
              <Col md={3} xc={3} className={styles.totalPrice + " p-3"}>
                {'Rp' + item?.transactionTotal}
              </Col>
            }
            { data === "Subtotal" &&
              <Col md={3} xc={3} className={"p-3"}>
                {'Rp' + item?.transactionSubTotal}
              </Col>
            }
            { data === "Ongkir" &&
              <Col md={3} xc={3} className={"p-3"}>
                {'Rp' + item?.courierPrice}
              </Col>
            }
            { data === "PPH (23 (2%)" &&
              <Col md={3} xc={3} className={"p-3"}>
                {'- Rp' + item?.transactionTotal?.pph}
              </Col>
            }
            {/* {styles.totalPrice + " p-3"} */}
          </Row>
        ))}
      </Col>
    )
  } else if(item.type === "text"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_handler}>{item.label}</Form.Label>
        <InputGroup hasValidation className="mb-2">
          <Form.Control
            className={item.notEditable ? styles.field_form_disabled  : styles.field_form}
            placeholder={item.placeholder}
            aria-label="ShipyardName"
            aria-describedby="basic-addon1"
            onChange={(e)=>item.action(e.target.value)}
            value={item.value}
            type={item.isNumberOnly ? "number": ""}
            required={item.required}
          />
          <Form.Control.Feedback type="invalid">
            {item.label} is required
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    )
  } else if (item.type === "password"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_handler}>{item.label}</Form.Label>
        <InputGroup hasValidation className="mb-1">
          <Form.Control 
            className={styles.field_form_password}
            type={showPassword ? "text" : "password"} 
            placeholder={item.placeholder}
            onChange={(e)=>item.action(e.target.value)}
            required={item.required}
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
  } else if (item.type === "textarea") {
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <InputGroup className="mb-2">
          <Form.Control
            className={styles.field_form}
            as="textarea"
            placeholder={item.placeholder}
            onChange={(e)=>item.action(e.target.value)}
            value={item.value}
            style={{ height: '100px' }}
            required={item.required}
          />
          <Form.Control.Feedback type="invalid">
            {item.label} is required
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    )
  } else if (item.type === "dropdownv2") {
    return dropdownComponent(item)
  } else if (item.type === "dropdown") {
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_handler}>{item.label}</Form.Label>
        <Form.Select aria-label="Default select example" className={styles.field_form} onChange={ (e)=> item.action(e, item.section)}>
          {item.value ?
            item.dataDropdown.map((oneData, index) =>{
              return <option value={`${oneData.id}||${oneData.name}`} key={index} selected={oneData.name === item.value.name ? true : false}>{oneData.name}</option>
            } )
            :
            item.dataDropdown.map((oneData, index) =>{
              return <option value={`${oneData.id}||${oneData.name}`} key={index}>{oneData.name}</option>
            } )
          }
          {/* <option selected={true} key={index}>ok</option> */}
        </Form.Select>
      </Col>
    )
  } else if (item.type === "dropdownChild") {
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <Form.Select aria-label="Default select example" className={styles.field_form} onChange={ (e)=> item.action(e, item.section)}>
          {/* <option>{item.value ? item.value.name : item.default}</option> */}
          {item.dataDropdown[item.selectedIsland.name].map((item, index) =>{
            return <option value={`${item.id}||${item.name}`} key={index}>{item.name}</option>
          } )}
        </Form.Select>
      </Col>
    )
  } else if (item.type === "button"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Button className={styles.save_button} type="submit" onClick={(e)=>item.action(e)}>
          {item.label}
        </Button>
      </Col>
    )
  } else if (item.type === "button_submit"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Button className={styles.save_button} onClick={((e)=>item.action(e))}> 
          {item.label}
        </Button>
      </Col>
    )
  } else if (item.type === "button_white"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        { item.action ? 
          <Button className={styles.cancel_button} onClick={((e)=>item.action(e))}>
            {item.label}
          </Button>
          :
          <Link to={item.link}>
            <Button className={styles.cancel_button} type="submit">
              {item.label}
            </Button>
          </Link>
        }
      </Col>
    )
  } else if (item.type === "uploadPhoto") {
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title_2}>{item.label}</Form.Label>
        <br/>
        {/* <Form.Control onChange={(e)=>{item.action(e)}} name="image" type="file" /> */}
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.desc}</Form.Label>
        <ImageUploading
          multiple={item.multiplePhoto ? true : false}
          value={item.images}
          onChange={item.action}
          maxNumber={item.maxImage}
          dataURLKey="data_url"
          acceptType={["jpg","png"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={(e) => {
                  e.preventDefault() 
                  onImageUpload()
                }}
                {...dragProps}
                className={styles.field_form_upload_image}>
                  Upload Photo
              </button>
              &nbsp;
              { item.maxImage !=1 && 
                <button onClick={(e) => {
                  e.preventDefault() 
                  onImageRemoveAll()
                }} className={styles.field_form_remove_image}>
                    Remove all images
                </button>
              }
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={(e) => { 
                      e.preventDefault()
                      onImageUpdate(index)}}
                      className={styles.button_update}>
                        Update
                    </button>
                    <button onClick={(e) => { 
                      e.preventDefault()
                      onImageRemove(index)}}
                      className={styles.button_remove}>
                        Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </Col>
    )
  } else if (item.type === "uploadDocument"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.mandatory ? item.label + "*": item.label }</Form.Label>
        <InputGroup hasValidation className="mb-2">
          {item.notEditable ? 
            <Form.Control
              className={styles.field_form_disabled}
              placeholder={item.placeholder}
              aria-describedby="basic-addon1"
              value={item.value}
            />
            : 
            <>
              <Form.Control 
                className="custom-file-input"
                type="file" 
                id={item.section}
                placeholder={item.placeholder}
                onChange={(e)=>item.action(e, item.section)}
                ref={uploadFile}
                required={item.required}
              />
              <InputGroup.Text id="basic-addon2" className={styles.eye_container} onClick={()=>uploadFile.current.click()}>
                <label className={styles.browse_file} htmlFor={item.id}>Browse File</label>
              </InputGroup.Text>
              <br/>
              {item.for === "update" && 
                <a href={item.value} className={styles.open_file} target="__blank">
                  <p className={styles.open_file_popup}>Click to open uploaded file by User</p>
                  <AiOutlineSearch color="#1b4460"/>
                </a>
              }
              <Form.Control.Feedback type="invalid">
                {item.label} is required
              </Form.Control.Feedback>
            </>
          }
        </InputGroup >
      </Col>
    )
  } else if (item.type === "uploadDocumentNoEdit"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon2" className={styles.eye_container_2} >
            <BsFillImageFill size={18} className={styles.image_icon} htmlFor={item.id} />
          </InputGroup.Text>
          <Form.Control
            className={styles.field_form_disabled_upload}
            placeholder={item.placeholder}
            aria-label="ShipyardName"
            aria-describedby="basic-addon1"
            tabIndex={item.notEditable ? "-1" : "1"}
          />
        </InputGroup >
      </Col>
    )
  } else if (item.type === "toggle"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title_2}>{item.label}</Form.Label>
        <InputGroup>
          <Form.Check 
            type="switch"
            checked={item.value}
            id="custom-switch"
            label={item.value? "Available" : "Not Available" }
            className={styles.switch}
            onChange={(e)=>item.action(e.target.checked)}
          />
        </InputGroup >
      </Col>
    )
  } else if (item.type === "date"){
    return (
      item.availability && 
        <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
          <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label> 
          <br/>
          <DatePicker className={styles.field_form} appearance="default" placeholder="Default" style={{ width: "100%", marginTop: "5px"  }} 
          onChange={(e)=> {item.action(e[0], e[1])}} 
          // value={[
          //   new Date(item.availableFrom * 1000),
          //   new Date(item.availableUntil * 1000)
          // ]}
          />
        </Col>
    )
  } else if (item.type === "dateRange"){
    return (
      item.availability && 
        <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
          <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label> 
          <br/>
          <DateRangePicker appearance="default" placeholder="Default" style={{ width: "100%" }} 
          onChange={(e)=> {item.action(e[0], e[1])}} 
          value={[
            new Date(item.availableFrom * 1000),
            new Date(item.availableUntil * 1000)
          ]}/>
        </Col>
    )
  } else if (item.type === "LABEL"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        <Form.Label htmlFor="basic-url" className={styles.field_title_3}>{item.label}</Form.Label> 
      </Col>
    )
  } else if (item.type === "SPACE"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        &nbsp;
      </Col>
    )
  } else if (item.type === "link"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section} onClick={ item.onClick && (()=>item.onClick())}>
        {item.link ? 
          <Link to={item.link}>
            <a className={styles.link}>{item.label}</a>
          </Link>
          :
          <a className={styles.link}>{item.label}</a>
        }
      </Col>
    )
  } else if (item.type === "checklist"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
        <Form.Label htmlFor="basic-url" className={styles.field_title}>{item.label}</Form.Label>
        <InputGroup>
          <Row>
            {item.datas.map((data, index)=>{
              return <Col key={index} xs={item.spaceMdChild} className={styles.checklist_text}>
                <Form.Check
                  inline
                  className={styles.checklist_text}
                  label={data.name}
                  name="group1"
                  checked={data.checked}
                  id={data.id}
                  onChange={()=>item.action(item.section, item.datas, index)}
                  />
              </Col>
            })}
          </Row>
        </InputGroup>
      </Col>
    )
  } else if (item.type === "buttonBlue"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        {item.link ? 
          <Link to={item.link}>
            <Button className={styles.save_button}>
              {item.label}
            </Button>
          </Link>
          :
          item.onClickAction ? 
            <Button className={styles.save_button} onClick={(e)=>item.onClickAction(e)}>
              {item.label}
            </Button>
            :
            <Button className={styles.save_button} >
              {item.label}
            </Button>
        }
      </Col>
    )
  } else if (item.type === "buttonWhite"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        {item.link ? 
          <Link to={item.link}>
            <Button className={styles.cancel_button}>
              {item.label}
            </Button>
          </Link>
          :
          <Button className={styles.cancel_button} onClick={(e)=>item.onClickAction(e)}>
            {item.label}
          </Button>
        }
      </Col>
    )
  } else if (item.type === "buttonDelete"){
    return (
      <Col md={item.spaceMd} xs={item.spaceXs} key={index} className={styles.section}>
        {item.link ? 
          <Link to={item.link}>
            <Button className={styles.delete_button}>
              {item.label}
            </Button>
          </Link>
          :
          <Button className={styles.delete_button} onClick={(e)=>item.onClickAction(e)}>
            {item.label}
          </Button>
        }
      </Col>
    )
  } else if (item.type === "cardAdd"){
    return (
      <Link to={item.link} className={styles.no_link} className={styles.card}>
        <Col md={item.spaceMd} xs={item.spaceXs} key={index}>
          <Row>
            <Col xs={7}>
              {item.label}
            </Col>
            <Col xs={{span: 2, offset: 3}}>
              <BiPlus size={20}/>
            </Col>
          </Row>
        </Col>
      </Link>
    )
  }
};

export default FieldHandler;
