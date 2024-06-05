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
  

  ForgotPasswordPage,
  CreatePasswordPage,
  NewShipyardOwnerPage,
  AddSupplierPage,
  AddContractorPage,
  AddEditFacilityPage,
  EditFacilityPage,
  AddShipPage,
  DetailShipPage,
  AddPortoPage,
  DetailPortoPage,
  MyAccountPage,
  ChangePasswordProfilePage,
  WaitVerificationPage,
  AccountReviewPage,
  MarinePage,
  PrivacyPolicyPage,
  NotFoundPage,
  HelpCenterPage,
  PreviewPage,
  CompanyListedPage,
  DashboardPage,
  NewShipyardPage,
  ShipyardDetailPage,
  ShipOwnerDetailPage,
  NewShipOwnerPage,
  NewSupplierContractorPage,
  SupplierContractorDetailPage,
  NewShipyardBannerPage,
  ShipyardBannerDetailPage,
  NewContractorBannerPage,
  ContractorBannerDetailPage,
  ContactInformationPage,
  NewFAQPage,
  ShipyardOwnerPage,
  ShipOwnerPage,
  SupplierContractorPage,
  FAQPage,
  FAQDetailPage,
  ShipyardBannerPage,
  ContractorBannerPage,
  NewAdminPage,
  AdminManagementPage,
  // AdminDetailPage,
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
                    <Route exact path="/disbursementDetail/:disbursementId" element={<DisbursementDetailPage/>} />
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
                    <Route exact path="/productDetail" element={<NewAdminPage/>} />
                    <Route exact path="/404" element={<NotFoundPage/>}/>
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
                    <Route exact path="/bannerManagement" element={<BannerManagementPage/>} />
                    <Route exact path="/newBanner" element={<NewBannerManagementPage/>} />
                    <Route exact path="/bannerDetail/:bannerId" element={<BannerDetailPage/>} />
                    <Route exact path="/memberManagement" element={<MemberPage/>} />
                    <Route exact path="/memberManagement/addMember" element={<AddMemberPage/>} />
                    <Route exact path="/memberDetail/:memberId" element={<MemberDetailPage/>} />
                    <Route exact path="/productDetail" element={<NewAdminPage/>} />
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
                    <Route exact path="/productDetail" element={<NewAdminPage/>} />
                    <Route exact path="/404" element={<NotFoundPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                  </Routes>
                }
                  
                  
                  {/* <Route exact path="/contactInformation" element={<ContactInformationPage/>} />
                  <Route exact path="/shipyardOwner" element={<ShipyardOwnerPage/>} />
                  <Route exact path="/newShipyardOwner" element={<NewShipyardOwnerPage/>} />
                  <Route exact path="/shipOwner" element={<ShipOwnerPage/>} />
                  <Route exact path="/newFaq" element={<NewFAQPage/>} />
                  <Route exact path="/newAdminPage" element={<NewAdminPage/>} />
                  <Route exact path="/adminManagement" element={<AdminManagementPage/>} />
                  <Route exact path="/adminDetailPage/:adminId" element={<AdminDetailPage/>} />
                  <Route exact path="/faq" element={<FAQPage/>} />
                  <Route exact path="/shipyardBanner" element={<ShipyardBannerPage/>} />
                  <Route exact path="/contractorBanner" element={<ContractorBannerPage/>} />
                  <Route exact path="/faqDetail/:id" element={<FAQDetailPage/>} />
                  <Route exact path="/supplierContractor" element={<SupplierContractorPage/>} />
                  <Route exact path="/newSupplierContractor" element={<NewSupplierContractorPage/>} />
                  <Route exact path="/orderManagementDetail/:orderId/newShipyard" element={<NewShipyardPage/>} />
                  <Route exact path="/orderManagementDetail/:orderId/newShipyard/addFacility" element={<AddEditFacilityPage/>} />
                  <Route exact path="/orderManagementDetail/:orderId/shipyardDetail/:shipyardId" element={<ShipyardDetailPage/>} />
                  <Route exact path="/orderManagementDetail/:orderId/shipyardDetail/:shipyardId/editFacility" element={<AddEditFacilityPage/>} />
                  <Route exact path="/supplierContractorDetail/:suppContId" element={<SupplierContractorDetailPage/>} />
                  <Route exact path="/shipyardBannerDetail/:bannerId" element={<ShipyardBannerDetailPage/>} />
                  <Route exact path="/contractorBannerDetail/:bannerId" element={<ContractorBannerDetailPage/>} />
                  <Route exact path="/shipyardDetail/:shipyardId" element={<ShipyardDetailPage/>} />
                  <Route exact path="/newShipyardOwner/newShipyard" element={<NewShipyardPage/>} />
                  <Route exact path="/addSupplier" element={<AddSupplierPage/>} />
                  <Route exact path="/addFacility" element={<AddEditFacilityPage/>} />
                  <Route exact path="/newShipOwner" element={<NewShipOwnerPage/>} />
                  <Route exact path="/editFacility/:facilityId" element={<AddEditFacilityPage/>} />
                  <Route exact path="/companyListed" element={<CompanyListedPage/>} />
                  <Route exact path="/newShipyardBanner" element={<NewShipyardBannerPage/>} />
                  <Route exact path="/newContractorBanner" element={<NewContractorBannerPage/>} />
                  <Route exact path="/shipOwnerDetail/:shipOwnerId" element={<ShipOwnerDetailPage/>} />
                  <Route exact path="/addShip/:shipBuildingId" element={<AddShipPage/>} />
                  <Route exact path="/detailShip/:shipId" element={<DetailShipPage/>} />
                  <Route exact path="/addPorto/:shipBuildingId" element={<AddPortoPage/>} />
                  <Route exact path="/addContractor" element={<AddContractorPage/>} />
                  <Route exact path="/detailPorto/:portoId" element={<DetailPortoPage/>} />
                  <Route exact path="/myAccount" element={<MyAccountPage/>} />
                  <Route exact path="/changePassword" element={<ChangePasswordProfilePage/>} />
                  <Route exact path="/waitVerification" element={<WaitVerificationPage/>} />
                  <Route exact path="/accountReview" element={<AccountReviewPage/>} />
                  <Route exact path="/marine" element={<MarinePage/>} />
                  <Route exact path="/privacyPolicy" element={<PrivacyPolicyPage/>} />
                  <Route exact path="/helpCenter" element={<HelpCenterPage/>} />
                  <Route exact path="/marine/preview" element={<PreviewPage/>} />
                  <Route exact path="/createPassword" element={<CreatePasswordPage setIsLogin={setIsLogin} isLogin={isLogin}/>} /> */}
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


                  <Route exact path="/forgotPassword" element={<ForgotPasswordPage/>} />
                  <Route exact path="/createPassword" element={<CreatePasswordPage/>} />
                  <Route exact path="/waitVerification" element={<WaitVerificationPage/>} />
                  <Route exact path="/accountReview" element={<AccountReviewPage/>} />
                  <Route exact path="/privacyPolicy" element={<PrivacyPolicyPage/>} />
                  <Route exact path="/helpCenter" element={<HelpCenterPage/>} />
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
