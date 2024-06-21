import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { connect } from "react-redux";
import styles from './Header.module.scss'
import { useLocation } from 'react-router-dom';
import { setLogoutResp } from '../../store/actions/loginRegisterAction'

const Header = ({ dispatch, isLogin, needLogin, dataLoginRegister}) => {
  const location = useLocation();
  const [menuProfile, setMenuProfile] = useState(false)
  const [transparentHeader, setTransparentHeader] = useState(false)

  const doLogout = (e) => {
    e.preventDefault();
    setLogoutResp(dispatch)
  }

	useEffect(()=>{
    if(isLogin){
      setTransparentHeader(false)
    }else{
      setTransparentHeader(true)
    }
	},[location, isLogin])

  useEffect(()=>{
    if( dataLoginRegister.logoutResp ){
      if( dataLoginRegister.logoutResp.success ){
        localStorage.clear()
        const myTimeout = setTimeout(reloadFunc, 2000);

        function reloadFunc() {
          window.location.reload();
        }
        myTimeout()
      }
    }
  },[dataLoginRegister.logoutResp])

	return (
    <Container className="ml-0">
      <Row className={transparentHeader ? styles.header_wrapper_transparent : styles.header_wrapper}>
        {/* <Col xs={2}>
          <a href="/">
            <img height={"42px"} width={"80px"} src={"/images/logoBlue.png"}/>
          </a>
        </Col> */}
        { isLogin && 
          <>
            <Col xs={{ span:7, offset:2 }}>
              <p className={styles.header_text}>
                {/* Admin Dashboard Web */}
              </p>
            </Col>
            <Col xs={{ span:2, offset:1 }} className="mt-2" 
              onMouseEnter={()=>setMenuProfile(true)}
              onMouseLeave={()=>setMenuProfile(false)}
            >
              <Row>
                {/* <Col xs={{ span:2, offset:0 }} className={styles.notif_bell}>
                  <FaRegBell size={18}/>
                </Col> */}
                <Col xs={{ span:10, offset:2 }} className={styles.profile}>
                  <Row>
                    <Col xs={4}>
                      <CgProfile className={styles.profile_pic}/>
                    </Col>
                    <Col xs={8} className="pt-1">
                      <font className={styles.user_name}>
                        {localStorage.getItem('full_name')}
                      </font> 
                    </Col>
                  </Row>
                </Col>
              </Row>
              { menuProfile && 
                <Container className={styles.profile_container}>
                  <Row>
                    <Col xs={12} className={styles.profile_menu} onClick={(e)=>doLogout(e)}>
                      <a className={styles.link} href="/">
                        <p className={styles.profile_text_container_2}>
                          <CgProfile className={styles.profile_text}/>
                            {"Logout"}
                        </p>
                      </a> 
                    </Col>
                  </Row>
                </Container>
              }
            </Col>
          </>
        }
      </Row>
    </Container>
	);
};

const storage = state => {
  return {
    dataLoginRegister: state.loginRegister
  };
};

export default connect(
  storage
)(Header)