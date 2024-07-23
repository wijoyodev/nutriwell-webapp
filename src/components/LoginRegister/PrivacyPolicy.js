import React, { useState } from "react";
import { Row, Col, Form  } from 'react-bootstrap'
import styles from './LoginRegister.module.scss'

const PrivacyPolicy = () => {

	return (
		<Col className={"col-md-9"}>
      <br/>
      <h2>
        Privacy Policy
      </h2>
      <p className={styles.privPol}>
        Thank you for using Garam Garena! This Privacy Policy outlines how we collect, use, disclose, and safeguard your 
        information when you use our mobile application (Garam Garena) and the services offered through it. Please read this 
        policy carefully to understand our practices regarding your personal data and how we will treat it.
        <br/>
        1. Information We Collect
        <br/>
        &nbsp;&nbsp;&nbsp; a. Personal Information: When you register for Garam Garena, we collect certain personal information such as your name, 
        email address, phone number, and any other information you provide to us during the registration process.
        <br/>
        &nbsp;&nbsp;&nbsp; b. Referral Code: Our App utilizes a referral code system. When you use a referral code to register, we collect the code 
        provided by an existing member. This allows us to attribute benefits to both the referrer and the new member who uses the code.
        <br/>
        <br/>
        2. How We Use Your Information
        <br/>
        &nbsp;&nbsp;&nbsp; a. To Provide Services: We use your personal information to operate, maintain, and provide you with the features and 
        functionality of Garam Garena, including processing your transactions and managing your account.
        <br/>
        &nbsp;&nbsp;&nbsp; b. Communication: We may use your contact information to communicate with you, including sending you transactional emails, 
        service-related announcements, and promotional messages.
        <br/>
        &nbsp;&nbsp;&nbsp; c. Referral Program: Information collected through the referral code system is used to attribute benefits to users who 
        participate in the referral program.
        <br/>
        <br/>
        3. Sharing of Information
        <br/>
        &nbsp;&nbsp;&nbsp; a. Third-Party Service Providers: We may share your personal information with third-party service providers who assist us 
        in providing the services offered through Garam Garena. For example:
        Payment Processing: We use Xendit as our third-party payment provider to process payments.
        Logistics: We use Biteship as our third-party logistics provider to handle shipping and delivery of products.
        <br/>
        &nbsp;&nbsp;&nbsp; b. Legal Compliance: We may disclose your information if required by law or in response to valid legal requests by public 
        authorities (e.g., a court or government agency).
        <br/>
        <br/>
        4. Data Security
        We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure.
        <br/>
        <br/>
        5. Your Choices and Rights
        <br/>
        &nbsp;&nbsp;&nbsp; a. Access and Correction: You have the right to access and correct your personal information held by us. You can update your 
        account information directly within the App or by contacting us.
        <br/>
        &nbsp;&nbsp;&nbsp; b. Marketing Communications: You can opt out of receiving promotional emails by following the unsubscribe instructions provided in the email.
        <br/>
        <br/>
        6. Changes to This Privacy Policy
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or 
        regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website or through other communication channels.
        <br/>
        <br/>
        7. Contact Us
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us to:
        <br/>
          Sutarna Dinata
        <br/>
          Email: dinatasutarna@gmail.com
        <br/>
          Phone: (+62) 85215912828.
      </p>
		</Col>
	);
};

export default PrivacyPolicy;
