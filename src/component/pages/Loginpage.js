import React, {
  Fragment,
  useContext,
  // useContext,
  useEffect,
  useRef,
  // useContext,
  useState
} from 'react';
import './MainNavigation.css'
import '../font-awesome/css/fontawesome.min.css'
import axios from 'axios';


import login from '../image/login.svg'
import logo from '../image/logo-fc.png';
import google from '../image/google.svg';
import facebook from '../image/facebook.svg';
import shopify from '../image/shopify.svg';
import envelope from '../image/envelope.svg';
import key from '../image/pass.png'
import avatar from '../image/avatar.svg'
import appstore from '../image/appstore.svg';
import playstore from '../image/playstore.svg';
import slasheye from '../image/eye-slash.svg';
import eye from '../image/eye.svg'; 
import indo from '../image/indonesia.png'
import AuthContext from '../auth/AuthProvider';



import {  Col, Container, Form, Nav, NavDropdown, Navbar, NavbarBrand, Row } from 'react-bootstrap';
import english from '../image/english.svg.svg'
import { NavLink } from 'react-router-dom';

import {  useNavigate } from 'react-router-dom/dist';
import Dashboard from './dashboard';





function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [flag, setFlag] = useState(false);
  const [country, setCountry] = useState('English');

    
   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  //  const { setAuth } = useContext(AuthContext);
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth({ isAuthenticated: false });
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('access_token')
    setSuccess(false)
    navigate('/')
    
    }

 
  // const userRef = useRef();
  const errRef = useRef();

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);

    try {
      const response = await axios.post('https://nimda.blazingwa.com/api/login-type',
        {
          username: username,
          password: password,
          mobile_code: '62',
          type: 'password'
        },
      
      );
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response));
      // const access_Token = response.data.access_token;
      // const roles = response.data.roles;
      // setAuth({username, password});
      localStorage.getItem('access_token')
      setUsername('');
      setPassword('');
      setSuccess(true);
      navigate('/dashboard');
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (error.response.status === 401) {
        setErrMsg('unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
     
    }
  }
  
  return (
      
    <>
     
      <Navbar expand="xxl" variant="light" className='navbar' >         
        <Container fluid>
        <NavbarBrand href='#' className='brand' >
            <img
              src={logo}
                height='63.5px'
                width='219.1px'
                alt=''
                loading='lazy'/>
            </NavbarBrand>
            <Nav className='language'>

            <img src={flag || english} alt="" style={{width: '34px', height: '34px'}} /> 
              
            <NavDropdown title={country} className="basic-nav-dropdown" >
                <NavDropdown.Item
            onClick={() =>{ 
            setCountry('English');
            setFlag(english);
                  }}>English</NavDropdown.Item>
                
            <NavDropdown.Item
                  onClick={() => {
                    setCountry('Indonesia');
                    setFlag(indo);
            }}>Indonesia</NavDropdown.Item>
              </NavDropdown>
              </Nav>
      </Container>
        </Navbar>

      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      
      
      {success ? (<Dashboard handleLogout={handleLogout} />) : (
        
        <Fragment>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <Container className='container'>
            <Row>
              <Col xs={6}>
                <br />
                <br />
                <br />
          <div>
                  <img src={avatar} alt='' />
                  <div className='store'>
                    <div>
                      <a href='https://www.apple.com/id/app-store/'>
                        <img src={appstore} alt="" />
                      </a>
                    </div>
                    <div>
                      <a href='https://play.google.com/store/games?hl=id&gl=US'>
                        <img src={playstore} alt="" />
                      </a>
                    </div>
                    </div>
                </div>
                </Col>
     
      
              <Col xs={6}>
                <div>
                  <div className='login'>
                  <img src={login} alt=" " />
                  </div>
                  <div className='google-button'>
                    <div>
                      <a href="https://www.google.com">
                        <img src={google} alt=" " />
                      </a>
                    </div>
                    <a href='https://id-id.facebook.com/'>
                      <img src={facebook} alt=" " />
                    </a>
                    <div>
                    <a href='https://www.shopify.com/id'>
                      <img src={shopify} alt=" " />
                    </a>
                    </div>
                    </div>
                  <p>or</p>
                  
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='label1' >Email</Form.Label>
              <div className='envelope'>
              <img src={envelope} alt='' className='keypass' />
        <Form.Control name="email"
                          value={username}
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter your username"
                              required
                          className='form-control' />
        </div>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label className='label1'>Password</Form.Label>
       <div className='envelope position-relative'>               
                        <img src={key} alt='' className='keypass' />
                         
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                              className='form-control'
                              required
                          placeholder="Password" />
                        <span className='eye' type='button' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <img  src={eye} alt='' /> : <img src={slasheye} alt='' /> }
                        </span>
                       
        </div>
      </Form.Group>
      <Form.Group className="mb-3 rememberme" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember me" className='checkbox' />
                      <NavLink to=" ">Forgot password?</NavLink>
      </Form.Group>
      <button type='submit' className='btn-submit'>
          Login                
      </button>
      </Form>
      <div className='donothave'>
            <p>Do not have an account?<NavLink className='signfor' to='/register'>  Sign up for free trial</NavLink></p>
      </div>

                  </div>
             </Col>  
              </Row>
            </Container>
        </Fragment>
        )}
          

    </>
  );
}

export default Login;