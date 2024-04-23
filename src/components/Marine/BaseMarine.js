import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from 'react-bootstrap';
import styles from './BaseMarine.module.scss';
import 'rsuite/dist/rsuite.min.css';
import SideMenu from "./SideMenu/SideMenu";
import About from "./About/About";
import DockingFacility from "./DockingFacility/DockingFacility";
import ShipBuilding from "./ShipBuilding/ShipBuilding";
import { Link } from "react-router-dom";

const BaseShipyard = () => {

  const [marineSupplier, setMarineSupplier] = useState(null)
  const [marineContractor, setMarineContractor] = useState(null)
  const [oneMenu, setOneMenu] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState("Marine Supplier")


	useEffect(()=>{
    // setMarineSupplier(null)
    // setMarineContractor(null)
    setMarineSupplier({
      supplyCategory: [{ 
          label: "Navigation & Communication",
          status: true,
        },{ 
          label: "Deck Machinery",
          status: true,
        },{ 
          label: "Safety",
          status: true,
        },{ 
          label: "Mechanical & Electrical",
          status: true,
        },{ 
          label: "Tools & Equipment",
          status: true,
        },{ 
          label: "Paint & Thinner",
          status: true,
        },{ 
          label: "Consumable",
          status: true,
        },{ 
          label: "Sparepart",
          status: true,
        },{ 
          label: "Personal Appliance",
          status: true,
        },{ 
          label: "Oil & Filter",
          status: true,
        },{ 
          label: "Valve Fitting",
          status: true,
        },
      ],
      supplyArea: [{
          label:"Batam", 
          status: false
        },{
          label:"Bangka Belitung", 
          status: true
        },{
          label:"Lampung", 
          status: true
        },{
          label:"Aceh", 
          status: true
        },{
          label:"Sumatera Utara", 
          status: true
        },{
          label:"Sumatera Selatan", 
          status: true
        },{
          label:"Riau", 
          status: true
        },{
          label:"Jambi", 
          status: true
        },{
          label:"Banten", 
          status: true
        },{
          label:"Jawa", 
          status: true
        },{
          label:"Jawa Tengah", 
          status: true
        },{
          label:"Jawa Barat", 
          status: true
        },{
          label:"Jawa Timur", 
          status: false
        },{
          label:"Kalimantan Barat", 
          status: false
        },{
          label:"Kalimantan Timur", 
          status: false
        },{
          label:"Kalimantan Selatan", 
          status: false
        },{
          label:"Sulawesi Tenggara", 
          status: false
        },{
          label:"Sulawesi Utara", 
          status: false
        },{
          label:"Sulawesi Selatan", 
          status: false
        },{
          label:"Maluku", 
          status: false
        },{
          label:"Papua Barat", 
          status: false
        },
      ],
      description: "asd",
      companyName: "Paxocean Shipyard Nanindah",
      supplies: "asd",
      address: "asd",
      contactName: "asd",
      whatsappNumber: "asd",
      website: "asd",
      companyFacebook: "asd",
      companyInstagram: "asd",
      companyLinkedin: "asd",
      companyPhoto: [{data_url:"https://i.ibb.co/Jr3J0d8/Test-Product-Only.jpg"},{data_url:"https://i.ibb.co/4gyWy6p/BG-INDUCTION.png"}],
    })

    setMarineContractor({
      supplyCategory: [{ 
          label: "Navigation & Communication",
          status: true,
        },{ 
          label: "Deck Machinery",
          status: true,
        },{ 
          label: "Safety",
          status: true,
        },{ 
          label: "Mechanical & Electrical",
          status: true,
        },{ 
          label: "Tools & Equipment",
          status: true,
        },{ 
          label: "Paint & Thinner",
          status: true,
        },{ 
          label: "Consumable",
          status: true,
        },{ 
          label: "Sparepart",
          status: true,
        },{ 
          label: "Personal Appliance",
          status: true,
        },{ 
          label: "Oil & Filter",
          status: true,
        },{ 
          label: "Valve Fitting",
          status: true,
        },
      ],
      supplyArea: [{
          label:"Batam", 
          status: true
        },{
          label:"Bangka Belitung", 
          status: true
        },{
          label:"Lampung", 
          status: true
        },{
          label:"Aceh", 
          status: true
        },{
          label:"Sumatera Utara", 
          status: true
        },{
          label:"Sumatera Selatan", 
          status: true
        },{
          label:"Riau", 
          status: true
        },{
          label:"Jambi", 
          status: true
        },{
          label:"Banten", 
          status: true
        },{
          label:"Jawa", 
          status: true
        },{
          label:"Jawa Tengah", 
          status: true
        },{
          label:"Jawa Barat", 
          status: true
        },{
          label:"Jawa Timur", 
          status: false
        },{
          label:"Kalimantan Barat", 
          status: false
        },{
          label:"Kalimantan Timur", 
          status: false
        },{
          label:"Kalimantan Selatan", 
          status: false
        },{
          label:"Sulawesi Tenggara", 
          status: false
        },{
          label:"Sulawesi Utara", 
          status: false
        },{
          label:"Sulawesi Selatan", 
          status: false
        },{
          label:"Maluku", 
          status: false
        },{
          label:"Papua Barat", 
          status: false
        },
      ],
      description: "asd",
      companyName: "Paxocean Nanindah",
      supplies: "asd",
      address: "asd",
      contactName: "asd",
      whatsappNumber: "asd",
      website: "asd",
      companyFacebook: "asd",
      companyInstagram: "asd",
      companyLinkedin: "asd",
      companyPhoto: [{data_url:"https://i.ibb.co/Jr3J0d8/Test-Product-Only.jpg"},{data_url:"https://i.ibb.co/4gyWy6p/BG-INDUCTION.png"}],
    })
	},[])

	return (
    <Container className={styles.container_shipyard}>
      { marineSupplier === null || marineContractor === null ? 
        <>
          <Row>
            <Col xs="12" className="text-center">
              <img height={"240px"} width={"240px"} src={"/images/emptyState.png"}/>
              <p>
                <br/>
                Complete your company information to be found by the ship owner.
              </p>
              <Link to={"../addSupplier"}>
                <Button className={styles.save_button} type="submit">
                  Start
                </Button>
              </Link>
            </Col>
          </Row>
        </>
        :
           oneMenu ? 
            <Col xs={{span:"8", offset:"2"}}>
              <About tabName={"Marine Contractor"} marineDatas={marineContractor} oneMenu={oneMenu}/>
            </Col>
            :
            <Row>
              <Col xs="4">
                <SideMenu 
                  marineSupplier={marineSupplier}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={setSelectedMenu}
                />
              </Col>
              <Col xs="8">
                { selectedMenu === "Marine Supplier" && 
                  <About tabName={"Marine Supplier"} marineDatas={marineSupplier} oneMenu={oneMenu}/>
                }
                { selectedMenu === "Marine Contractor" &&
                  <About tabName={"Marine Contractor"} marineDatas={marineContractor} oneMenu={oneMenu}/>
                }
              </Col>
            </Row>
          
      }
    </Container>
	);
};

export default BaseShipyard;
