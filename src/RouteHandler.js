import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'
import { 
  LoginPage,
  OrderManagementPage,
  OrderManagementDetailPage,
  SalesReportPage,
  DisbursementPage,
  DisbursementDetailPage,
  AdminPage,
  AddAdminPage,
  AdminDetailPage,
  NewBannerManagementPage,
  BannerManagementPage,
  BannerDetailPage,
  MemberPage,
  MemberDetailPage,
  AddMemberPage,
  ProductDetailPage,
  NotFoundPage,
  InvoicePage,
  PrivacyPolicyPage,
} from './pages'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideMenu from "./components/SideMenu/SideMenu";
import Header from "./components/Header/Header";

function RouteHandler() {
  const [isLogin, setIsLogin] = useState("")
  const [token, setToken] = useState("")
  let location = useLocation();

  useEffect(()=>{
    if( localStorage.getItem('token') && localStorage.getItem('webGarenaLogedIn') ){
      setIsLogin(true)
      setToken(localStorage.getItem('token'))
    } else {
      setIsLogin(false)
    }
  },[location])

  return (
    <>
      { isLogin !== "" && 
        <Row>
          { isLogin ?
            <>
              <Header isLogin={isLogin} token={token} needLogin={true}/>
              <Col xs="2" className="side_menu">
                <SideMenu/>
              </Col>
              <Col xs={"9"} className={"main_menu_login"}>

                {/* ROLE 1 === super admin */}
                { localStorage.getItem('role') === "1" && 
                  <Routes>
                    <Route exact path="/" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagement" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagementDetail/:orderId" element={<OrderManagementDetailPage/>} />
                    <Route exact path="/salesReport" element={<SalesReportPage/>} />
                    <Route exact path="/disbursement" element={<DisbursementPage/>} />
                    <Route exact path="/disbursementDetail/:memberId/:disbursementId" element={<DisbursementDetailPage/>} />
                    <Route exact path="/adminManagement" element={<AdminPage/>} />
                    <Route exact path="/adminDetail/:adminId" element={<AdminDetailPage/>} />
                    <Route exact path="/adminManagement/addAdmin" element={<AddAdminPage/>} />
                    <Route exact path="/bannerManagement" element={<BannerManagementPage/>} />
                    <Route exact path="/newBanner" element={<NewBannerManagementPage/>} />
                    <Route exact path="/bannerDetail/:bannerId" element={<BannerDetailPage/>} />
                    <Route exact path="/memberManagement" element={<MemberPage/>} />
                    <Route exact path="/memberManagement/addMember" element={<AddMemberPage/>} />
                    <Route exact path="/memberDetail/:memberId" element={<MemberDetailPage/>} />
                    <Route exact path="/memberDetail/:memberId/:disbursementId" element={<DisbursementDetailPage/>} />
                    <Route exact path="/productDetail" element={<ProductDetailPage/>} />
                    <Route exact path="/404" element={<NotFoundPage/>}/>
                    <Route exact path="/invoice/:orderId" element={<InvoicePage/>} />
                    <Route path="*" element={<NotFoundPage/>}/>
                  </Routes>
                }
                
                {/* ROLE 2 === manager  */}
                { localStorage.getItem('role') === "2" && 
                  <Routes>
                    <Route exact path="/" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagement" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagementDetail/:orderId" element={<OrderManagementDetailPage/>} />
                    <Route exact path="/salesReport" element={<SalesReportPage/>} />
                    <Route exact path="/disbursement" element={<DisbursementPage/>} />
                    <Route exact path="/disbursementDetail/:disbursementId" element={<DisbursementDetailPage/>} />
                    <Route exact path="/adminManagement" element={<AdminPage/>} />
                    <Route exact path="/adminDetail/:adminId" element={<AdminDetailPage/>} />
                    <Route exact path="/bannerManagement" element={<BannerManagementPage/>} />
                    <Route exact path="/newBanner" element={<NewBannerManagementPage/>} />
                    <Route exact path="/bannerDetail/:bannerId" element={<BannerDetailPage/>} />
                    <Route exact path="/memberManagement" element={<MemberPage/>} />
                    <Route exact path="/memberManagement/addMember" element={<AddMemberPage/>} />
                    <Route exact path="/memberDetail/:memberId" element={<MemberDetailPage/>} />
                    <Route exact path="/productDetail" element={<ProductDetailPage/>} />
                    <Route exact path="/404" element={<NotFoundPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                  </Routes>
                }
                
                {/* ROLE 3 === admin packing  */}
                { localStorage.getItem('role') === "3" && 
                  <Routes>
                    <Route exact path="/" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagement" element={<OrderManagementPage/>} />
                    <Route exact path="/orderManagementDetail/:orderId" element={<OrderManagementDetailPage/>} />
                    <Route exact path="/productDetail" element={<ProductDetailPage/>} />
                    <Route exact path="/404" element={<NotFoundPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                  </Routes>
                }
              </Col>
            </>
          :
            // not login route
            <>
              <Header isLogin={isLogin} token={token} needLogin={false}/>
              <Col xs={"12"} className={"main_menu"}>
                <Routes>
                  <Route exact path="/" element={<LoginPage/>} />
                  <Route exact path="/login" element={<LoginPage/>} />
                  <Route exact path="/privacyPolicy" element={<PrivacyPolicyPage/>} />
                  <Route exact path="/404" element={<NotFoundPage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
              </Col>
            </>
          }
        </Row>
      }
    </>
  );
}

export default RouteHandler;
