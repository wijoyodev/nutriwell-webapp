import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const PrivacyPolicyPage = () => {

  useEffect(()=>{
  },[])

  return (    
    <>
      <Container>
        <Row>
          <Col xs={{span:10, offset:1}} className="privacy_wrapper">
            <h1 className="fw-6">
              Privacy Policy
            </h1>
            <p>
              <br/>
              At GAPAL, we are committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and share information 
              about you when you use our mobile application GAPAL and the services offered through GAPAL.
              <br/>
              <br/>
              We collect information about you in the following ways:
              <br/>
              <ul>
                <li>
                  Information you provide to us directly: We may collect personal information from you, such as your name, email address, and phone number, 
                  when you create an account, contact customer support, or otherwise interact with us through the App or Services.
                </li>
                <li>
                  Information we collect automatically: When you use the App or Services, we may automatically collect certain information about your device 
                  and usage of the App or Services. This may include your IP address, device type and identifier, browser type, and other technical information. 
                  We may also collect information about your location and movement through the App or Services.
                </li>
              </ul>
              We use the information we collect for the following purposes:
              <br/>
              <ul>
                <li>
                  To provide and improve the App and Services: We use the information we collect to provide and maintain the App and Services, 
                  including to troubleshoot and fix any issues that may arise.
                </li>
                <li>
                  To communicate with you: We may use your personal information to contact you with updates, marketing materials, or other information 
                  about the App and Services. You may opt out of receiving these communications at any time by following the unsubscribe instructions 
                  provided in the communication.
                </li>
                <li>
                  To protect the security and integrity of the App and Services: We may use the information we collect to protect the security and integrity
                  of the App and Services, including to detect and prevent fraudulent or abusive activity.
                </li>
              </ul>
              We may share your information with third parties in the following circumstances:
              <br/>
              <ul>
                <li>
                  With our service providers: We may share your information with third party service providers who assist us in providing the App and Services, 
                  such as hosting and maintenance, analytics, and marketing.
                </li>
                <li>
                  With law enforcement or in response to legal requests: We may disclose your information to law enforcement or government authorities, or in response to a 
                  legal request, in order to protect the security and integrity of the App and Services, or to comply with applicable laws and regulations.
                </li>
                <li>
                  In connection with a sale or merger: In the event that we sell or merge with another company, we may disclose your information to the potential 
                  buyer or merger partner.
                </li>
              </ul>
            </p>
            <p>
              We take reasonable steps to protect your information from unauthorized access or disclosure. However, no system is completely secure, and we cannot guarantee 
              the security of your information. You have the right to request access to, or correction of, your personal information. You may also have the right to request 
              that we delete your personal information or restrict our use of it. To exercise these rights, please contact us at xxxx.
            </p>
            <p>
              This Privacy Policy may be updated from time to time. We will post any updates on this page, and we encourage you to review the policy periodically 
              for the most current information about our privacy practices.
            </p>
            <p>
              If you have any questions about this Privacy Policy, <a href='/helpCenter'> please contact us HERE </a> .
            </p>
            <br/>
            <br/>
            <br/>
            <br/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
