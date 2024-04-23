import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, InputGroup, } from 'react-bootstrap'
import ImageUploading from "react-images-uploading";
import styles from './About.module.scss'
import { Link } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

const About = ({
  marineDatas,
  tabName,
  oneMenu,
}) => {
  const [dataSupplyCategory, setDataSupplyCategory] = useState([ 
    "Navigation & Communication", "Deck Machinery", "Safety", 
    "Mechanical & Electrical", "Tools & Equipment", "Paint & Thinner", 
    "Consumable", "Sparepart", "Personal Appliance", "Oil & Filter", 
    "Valve Fitting",
  ])
  const [dataSupplyArea, setDataSupplyArea] = useState([
    "Batam", "Bangka Belitung", "Lampung", "Aceh", "Sumatera Utara", 
    "Sumatera Selatan", "Riau", "Jambi", "Banten", "Jawa", "Jawa Tengah", 
    "Jawa Barat", "Jawa Timur", "Kalimantan Barat", "Kalimantan Timur", 
    "Kalimantan Selatan", "Sulawesi Tenggara", "Sulawesi Utara", "Sulawesi Selatan", 
    "Maluku", "Papua Barat",
  ])
  const [editStatus, setEditStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedIsland, setSelectedIsland] = useState("");
  const [supplyArea, setSupplyArea] = useState([]);
  const [supplyCategory, setSupplyCategory] = useState([]);
  const [supplies, setSupplies] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [companyFacebook, setCompanyFacebook] = useState("");
  const [companyInstagram, setCompanyInstagram] = useState("");
  const [companyLinkedin, setCompanyLinkedin] = useState("");
  
  const onChangeImage = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const onChangeChecklist = (section, allData, index) => {
    let datas = [...allData]
    if( section === "Supply Area" ){
      datas[index].status = !datas[index].status
      setSupplyArea(datas)
    } else if( section === "Supply Category" ){
      datas[index].status = !datas[index].status
      setSupplyCategory(datas)
    }
  }

	useEffect(()=>{
    setSelectedIsland(marineDatas.island)
    setSupplyCategory(marineDatas.supplyCategory)
    setSupplyArea(marineDatas.supplyArea)
    setDescription(marineDatas.description)
    setCompanyName(marineDatas.companyName)
    setSupplies(marineDatas.supplies)
    setAddress(marineDatas.address)
    setContactName(marineDatas.contactName)
    setWhatsappNumber(marineDatas.whatsappNumber)
    setWebsite(marineDatas.website)
    setCompanyFacebook(marineDatas.companyFacebook)
    setCompanyInstagram(marineDatas.companyInstagram)
    setCompanyLinkedin(marineDatas.companyLinkedin)
    setImages(marineDatas.companyPhoto)
	},[marineDatas])

  const onClickFunc = () => {
  }

  const handleSelect = (e, type) => {
    const value = e.target.value;
  } 

	return (
		<Container>
      <Row>
        { oneMenu ? 
          <>
            <Col xs={{span: "6", offset: "0"}}>
              <p className={styles.shipyard_name}>
                {companyName}
              </p>
            </Col>
            <Col xs={{span: "3", offset: "3"}}>
              <Link to="../marine/preview" target="_blank">
                <Button className={styles.save_button} onClick={()=>onClickFunc()} type="submit">
                  Preview
                </Button>
              </Link>
            </Col>
          </>
          :
          <Col xs={{span: "3", offset: "9"}}>
            <Link to="../marine/preview" target="_blank">
              <Button className={styles.save_button} onClick={()=>onClickFunc()} type="submit">
                Preview
              </Button>
            </Link>
          </Col>
        }
      </Row>
      {
        companyName != "" &&
        <Row className={styles.middle_container}>
          <Col xs="12">
            <Row>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Company Name *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Company Name"}
                      aria-label="companyName"
                      aria-describedby="basic-addon1"
                      value={companyName}
                      onChange={ (e) => setCompanyName(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {companyName} </Form.Label>
                  </>
                }
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Description *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      as="textarea"
                      placeholder={"input description"}
                      style={{ height: '100px' }}
                      value={description}
                      onChange={ (e) => setDescription(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> 
                      {description}
                    </Form.Label>
                  </>
                }
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }>Supply Category *</Form.Label>
                <InputGroup className={styles.checklist}>
                  <Row>
                    { editStatus ?
                      supplyCategory.map((data, index)=>{
                        return <Col key={index} xs={6} className={styles.checklist_text}>
                          <Form.Check
                            inline
                            onChange={()=>onChangeChecklist("Supply Category", supplyCategory, index)}
                            checked={data.status}
                            className={styles.checklist_text}
                            label={data.label}
                            name="group1"
                            id={data.id}
                            />
                        </Col>
                      })
                    :
                      supplyCategory.map((data, index)=>{
                        return data.status === true && <Col key={index} xs={6} className={styles.checklist_text}>
                          <Form.Check
                            inline
                            checked={data.status}
                            className={styles.checklist_text}
                            label={data.label}
                            name="group1"
                            id={data.id}
                            />
                        </Col>
                      })
                    }
                  </Row>
                </InputGroup>
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }>Supplies *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      as="textarea"
                      placeholder={"input Supplies"}
                      style={{ height: '100px' }}
                      value={supplies}
                      onChange={ (e) => setSupplies(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {supplies} </Form.Label>
                  </>
                }
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }>Supply Area *</Form.Label>
                <InputGroup className={styles.checklist}>
                  <Row>
                    { editStatus ?
                      supplyArea.map((data, index)=>{
                        return <Col key={index} xs={6} className={styles.checklist_text}>
                          <Form.Check
                            inline
                            onChange={()=>onChangeChecklist("Supply Area", supplyArea, index)}
                            checked={data.status}
                            className={styles.checklist_text}
                            label={data.label}
                            name="group1"
                            id={data.id}
                            />
                        </Col>
                      })
                    :
                      supplyArea.map((data, index)=>{
                        return data.status === true && <Col key={index} xs={6} className={styles.checklist_text}>
                          <Form.Check
                            inline
                            checked={data.status}
                            className={styles.checklist_text}
                            label={data.label}
                            name="group1"
                            id={data.id}
                            />
                        </Col>
                      })
                    }
                  </Row>
                </InputGroup>
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }>Address *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Address"}
                      aria-label="ShipyardName"
                      aria-describedby="basic-addon1"
                      value={address}
                      onChange={ (e) => setAddress(e.target.value)  }
                    />
                  </InputGroup>
                    :
                    <>
                      <br/>
                      <Form.Label htmlFor="basic-url" className={styles.field_item}> {address} </Form.Label>
                    </>
                  }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Contact Name *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Contact Name"}
                      aria-label="ShipyardName"
                      aria-describedby="basic-addon1"
                      value={contactName}
                      onChange={ (e) => setContactName(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {contactName} </Form.Label>
                  </>
                }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Whatsapp Number *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Whatsapp Number"}
                      aria-label="ShipyardName"
                      aria-describedby="basic-addon1"
                      value={whatsappNumber}
                      onChange={ (e) => setWhatsappNumber(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {whatsappNumber} </Form.Label>
                  </>
                }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Website </Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Website"}
                      aria-label="companydName"
                      aria-describedby="basic-addon1"
                      value={website}
                      onChange={ (e) => setWebsite(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {website} </Form.Label>
                  </>
                }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Company Facebook *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Company Facebook"}
                      aria-label="CompanyName"
                      aria-describedby="basic-addon1"
                      value={companyFacebook}
                      onChange={ (e) => setCompanyFacebook(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {companyFacebook} </Form.Label>
                  </>
                }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Company Instagram *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Company Instagram"}
                      aria-label="CompanyName"
                      aria-describedby="basic-addon1"
                      value={companyInstagram}
                      onChange={ (e) => setCompanyInstagram(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {companyInstagram} </Form.Label>
                  </>
                }
              </Col>
              <Col md={6} xs={6}>
                <Form.Label htmlFor="basic-url" className={editStatus ? styles.field_title : styles.field_title_3 }> Company Linkedin *</Form.Label>
                { editStatus ?  
                  <InputGroup>
                    <Form.Control
                      className={styles.field_form}
                      placeholder={"input Company Linkedin"}
                      aria-label="CompanyName"
                      aria-describedby="basic-addon1"
                      value={companyLinkedin}
                      onChange={ (e) => setCompanyLinkedin(e.target.value)  }
                    />
                  </InputGroup>
                  :
                  <>
                    <br/>
                    <Form.Label htmlFor="basic-url" className={styles.field_item}> {companyLinkedin} </Form.Label>
                  </>
                }
              </Col>
              <Col md={12} xs={12}>
                <Form.Label htmlFor="basic-url" className={styles.field_item_2}>{"Photo"}</Form.Label>
                <br/>
                { editStatus &&
                  <Form.Label htmlFor="basic-url" className={styles.field_title}>{"You can add up to 10 Photos"}</Form.Label>
                }
                { editStatus ?  
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChangeImage}
                    maxNumber={10}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
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
                        <button onClick={(e) => {
                          e.preventDefault() 
                          onImageRemoveAll()
                        }} className={styles.field_form_remove_image}>
                          Remove all images
                        </button>
                        <Row>
                          {imageList.map((image, index) => (
                            <Col xs="6" key={index}>
                              <div className="image-item">
                                <img src={image.data_url} alt="" width="200" height="200" />
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
                            </Col>
                          ))}
                        </Row>
                      </div>
                    )}
                    </ImageUploading>
                    :
                    <>
                      <br/>
                      <Row>
                        {
                          images.map((item, index) =>{
                          return (
                            <Col key={index} xs="6">
                              <img src={item.data_url} className={styles.photo}/>
                            </Col>
                            )
                        })}
                      </Row>
                    </>
                  }
              </Col>
              { editStatus ? 
                <Row className="mt-3">
                  <Col md="2" xs="12">
                    <Button className={styles.cancel_button} onClick={()=>setEditStatus(false)} type="submit">
                      Cancel
                    </Button>
                  </Col>
                  <Col md={{span:"3", offset: "7"}} xs="12">
                    <Button className={styles.save_button} onClick={()=>onClickFunc()} type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
                :
                <Row className="mt-3">
                  <Col md="2" xs="12">
                    <Button className={styles.save_button} onClick={()=>setEditStatus(true)} type="submit">
                      Edit Information
                    </Button>
                  </Col>
                </Row>
              }
            </Row>
          </Col>
        </Row>
      }
		</Container>
	);
};

export default About;
