import React, { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import { CgProfile, CgFileDocument } from 'react-icons/cg'
import { FaQuestion, FaRegBell } from 'react-icons/fa'
import { connect } from "react-redux";
import { useMediaQuery } from 'react-responsive'
import styles from './Header.module.scss'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogoutResp, setRefreshToken } from '../../store/actions/loginRegisterAction'

const Header = ({ dispatch, isLogin, needLogin, dataLoginRegister}) => {
  const navigate = useNavigate()
  const location = useLocation();
  const [menuProfile, setMenuProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [transparentHeader, setTransparentHeader] = useState(true)

  const checkWebAuth = (data) => {
    // if( data !== "admin_web" ){
    //   localStorage.clear()
    //   localStorage.setItem('web', "admin_web")
    //   if( !location.pathname === "/forgotPassword" ){
    //     navigate('/');
    //   }
    // }
  }

  // const isTokenExpired = () => {
  //   const token           = localStorage.getItem('token')
  //   const lastLogin       = localStorage.getItem('last_login')

  //   if( token === null && needLogin ){
  //     localStorage.clear()
  //     navigate('/');
  //   } else if( lastLogin ){
  //     // ask user to relogin if more than 3 hours session token from last login
  //     const hourDiff = Math.abs(Date.now() - lastLogin) / 36e5 ;
  //     if( hourDiff > 3 ){
  //       localStorage.clear()
  //       Swal.fire({
  //         title: 'Session Expired',
  //         text: "Please re-login to continue",
  //         icon: 'warning',
  //         confirmButtonColor: '#1b4460',
  //       })
  //       if(window.location.pathname != "/"){
  //         navigate('/');
  //       }
  //     }
  //   } else if ( token && !lastLogin ){
  //     localStorage.clear()
  //     Swal.fire({
  //       title: 'Session Expired',
  //       text: "Please re-login to continue",
  //       icon: 'warning',
  //       confirmButtonColor: '#1b4460',
  //     })
  //     if(window.location.pathname != "/"){
  //       navigate('/');
  //     }
  //   }
  // }

  const checkLocation = (currPath) => {
    if( isLogin ){
      setTransparentHeader(false)
    } else {
      setTransparentHeader(true)
    }
    setIsLoading(false)
  }

  const doLogout = (e) => {
    e.preventDefault();
    console.log("MASUK LOGOUN")
    // Swal.fire({
    //   title: 'Success',
    //   text: "Logout success",
    //   icon: 'success',
    //   confirmButtonColor: '#1b4460',
    // })
    setLogoutResp(dispatch)
    // localStorage.clear()
    // setTimeout(() => { 
    //   navigate('/');
    // }, 1000)
  }

	useEffect(()=>{
    checkWebAuth(localStorage.getItem('web'))
    checkLocation(location.pathname)
    // isTokenExpired()
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

	useEffect(()=>{
    if(localStorage.getItem("token")){
      // setRefreshToken(dispatch)
    }
    // isTokenExpired()
	},[])

	return (
    isLoading === false &&
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
                  <Col xs={{ span:2, offset:0 }} className={styles.notif_bell}>
                    <FaRegBell size={18}/>
                  </Col>
                  <Col xs={{ span:10, offset:0 }} className={styles.profile}>
                    <Row>
                      <Col xs={4}>
                        <CgProfile className={styles.profile_pic}/>
                      </Col>
                      <Col xs={8}>
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