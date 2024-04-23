import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SiWhatsapp } from 'react-icons/si'
import { BsArrowRightCircle } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { AiOutlineMail } from 'react-icons/ai'
import { connect } from "react-redux";
import { setContactInfo } from '../store/actions/loginRegisterAction'


const HelpCenterPage = ({ dispatch, dataLoginRegister }) => {
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(()=>{
    setContactInfo(dispatch)
  },[])

  useEffect(()=>{
    if( dataLoginRegister.contactInfoResp ){
      setContactPhone(dataLoginRegister.contactInfoResp.whatsappNumber)
      setContactEmail(dataLoginRegister.contactInfoResp.email)
    }
  },[dataLoginRegister.contactInfoResp])

  return (    
    <>
      <Container>
        <Row>
          <Col xs={{span:10, offset:1}} className="privacy_wrapper">
            <Row>
              <h1 className="fw-6">
                Help Center
              </h1>
            </Row>
            <Row className="mt-5">
              <h3>
                Need assistance? Reach us through Whatsapp or Email 
              </h3>
            </Row>
            <Row className="mt-3">
              <Col xs={6} className="pl-5 pl-5 wrapper_card">
                <a className={"link_no_underline"} href={`mailto: ${contactEmail}`}>
                  <Row className="card_help_center">
                    <Col xs={2}>
                      <AiOutlineMail size={40}/>
                    </Col>
                    <Col xs={8}>
                      <Row>
                        <h4 className="title_card"> Email </h4>
                        <p className="desc_card"> {contactEmail} </p>
                      </Row>
                    </Col>
                    <Col xs={2}>
                      <BsArrowRightCircle size={40}/>
                    </Col>
                  </Row>
                </a>
              </Col>
              <Col xs={6} className="pl-5 pl-5 wrapper_card">
                <a className={"link_no_underline"} target="__blank" href={`https://api.whatsapp.com/send/?phone=${contactPhone}&text=Hello+Gapal&type=phone_number&app_absent=0`}>
                  <Row className="card_help_center">
                    <Col xs={2}>
                      <SiWhatsapp size={40}/>
                    </Col>
                    <Col xs={8}>
                      <Row>
                        <h4 className="title_card"> Whatsapp </h4>
                        <p className="desc_card"> {contactPhone} </p>
                      </Row>
                    </Col>
                    <Col xs={2}>
                      <BsArrowRightCircle size={40}/>
                    </Col>
                  </Row>
                </a>
              </Col>
            </Row>
            <h3 className="mt-5">
              Frequently Asked Questions
            </h3>
            <ol className="mt-3">
              <li>
                <strong>
                  Acceptance  of terms
                </strong>
                <p>
                  By accessing or using the app, you agree to be bound by these  terms and conditions. If you do not agree to these terms, 
                  do not use  the app. 
                </p>
              </li>
              <li>
                <strong>
                  Modification  of terms
                </strong>
                <p>
                  We reserve the right to modify these terms at any time  without prior notice. Your continued use of the app following the 
                  posting of any changes constitutes acceptance of those changes. 
                </p>
              </li>
              <li>
                <strong>
                  Privacy  policy
                </strong>
                <p>
                  Our privacy policy, which can be found <Link to={"../privacyPolicy"}>here</Link>, explains  how we collect, use, and share information about you when 
                  you use our  app. By using the app, you consent to the collection, use, and sharing  of your information as described in the 
                  privacy policy. 
                </p>
              </li>
              <li>
                <strong>
                  User  content
                </strong>
                <p>
                  You may be able to post comments, images, or other content to  the app. By posting content to the app, you represent and
                  warrant that  you have the right to do so and that the content does not infringe on  the intellectual property rights of any 
                  third party. You also grant us a  perpetual, non-exclusive, royalty-free, fully sublicensable, and  worldwide license to use, 
                  reproduce, modify, adapt, publish, translate,  distribute, and display your content on the app. 
                </p>
              </li>
              <li>
                <strong>
                  Disclaimer  of warranties
                </strong>
                <p>
                  The app is provided on an "as is" and "as available"  basis. We make no representations or warranties of any kind, express or 
                  implied, as to the operation of the app or the information, content,  materials, or products included on the app. 
                </p>
              </li>
              <li>
                <strong>
                  Limitation  of liability
                </strong>
                <p>
                  We will not be liable for any damages of any kind arising  from the use of the app, including, but not limited to, direct, 
                  indirect, incidental, punitive, and consequential damages. 
                </p>
              </li>
              <li>
                <strong>
                  Governing  law
                </strong>
                <p>
                  These terms and your use of the app will be governed by and  construed in accordance with the laws of [insert jurisdiction]. 
                </p>
              </li>
              <li>
                <strong>
                  Dispute  resolution
                </strong>
                <p>
                  Any disputes arising out of or in connection with these  terms or the app will be resolved through [insert dispute resolution 
                  method, such as arbitration or mediation]. 
                </p>
              </li>
              <li>
                <strong>
                  Entire  agreement
                </strong>
                <p>
                  These terms constitute the entire agreement between you and  us with respect to the app and supersede all prior or 
                  contemporaneous  communications and proposals, whether oral or written. 
                </p>
              </li>
              <li>
                <strong>
                  Severability
                </strong>
                <p>
                  If any provision of these terms is found to be invalid or  unenforceable, that provision will be enforced to the maximum 
                  extent  possible, and the remaining provisions will remain in full force and  effect. 
                </p>
              </li>
              <li>
                <strong>
                  User  accounts
                </strong>
                <p>
                  You may be required to create an account in order to access  certain features of the app or website. You are responsible for  
                  maintaining the confidentiality of your account login information and  for any and all activities that occur under your account.
                  You agree to  notify us immediately of any unauthorized use of your account. 
                </p>
              </li>
              <li>
                <strong>
                  Links  to third-party sites
                </strong>
                <p>
                  The app or website may contain links to  third-party sites. These links are provided for your convenience and are  
                  not under our control. We are not responsible for the content or  practices of any third-party sites, and the inclusion of 
                  a link does not  imply endorsement by us. 
                </p>
              </li>
              <li>
                <strong>
                  Intellectual  property
                </strong>
                <p>
                  The app or website and all content and materials included on  it, including but not limited to text, graphics, logos, 
                  images, and  software, are the property of [company name] or its licensors and are  protected by copyright and trademark laws. 
                  You may not use any content  or materials on the app or website for any commercial purpose without  the express written consent 
                  of [company name]. 
                </p>
              </li>
              <li>
                <strong>
                  Termination
                </strong>
                <p>
                  We reserve the right to terminate or suspend your access to the app or  website at any time, for any reason, 
                  and without notice. 
                </p>
              </li>
              <li>
                <strong>
                  Indemnification
                </strong>
                <p>
                  You agree to indemnify and hold us and our affiliates, officers,  agents, and employees harmless from any claim or 
                  demand, including  reasonable attorneys' fees, made by any third party due to or arising  out of your use of the app 
                  or website, your violation of these terms, or  your violation of any rights of another. 
                </p>
              </li>
              <li>
                <strong>
                  Waiver
                </strong>
                <p>
                  The failure of us to exercise or enforce any right or provision of  these terms will not constitute a waiver of 
                  such right or provision. 
                </p>
              </li>
              <li>
                <strong>
                  Language
                </strong>
                <p>
                  These terms and any related documents will be written in English. If these terms are translated 
                  into any other language, the  English language version will prevail in the event of any conflict. 
                </p>
              </li>
              <li>
                <strong>
                  Contact us
                </strong>
                <p>
                  If you have any questions about these terms, please contact us at Email 
                  <a href={`mailto: ${contactEmail}`}>
                    &nbsp; {contactEmail}
                  </a> . 
                </p>
              </li>
            </ol>
            <br/>
            <br/>
            <br/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(HelpCenterPage)