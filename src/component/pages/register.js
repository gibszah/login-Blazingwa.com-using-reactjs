import React, { useContext, useEffect, useRef, useState } from 'react';
import './register.css'
import '../font-awesome/css/fontawesome.min.css'



import logo from '../image/logo-fc.png';
import licheck from '../image/licheck.svg';
import indo from '../image/indonesia.png'
import xmark from '../image/xmark.svg';
import singup from '../image/signup.svg';
import arrow from '../image/arrow.svg'
import wa from '../image/wa.svg';
import eye from '../image/eye.svg';
import slasheye from '../image/eye-slash.svg';
import appstore from '../image/appstore.svg';
import google from '../image/playstore.svg';
import Profile from './profile';


import {  Button, Col, Form, Nav, NavDropdown, Row, 
} from 'react-bootstrap';
import english from '../image/english.svg.svg'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import {
  Link,
  NavLink
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import AuthContext from '../auth/AuthProvider';
import axios from 'axios';



function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [flag, setFlag] = useState(false);
  const [language, setLanguage] = useState('English');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [mobileCode, setMobileCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [stateCountry, setStateCountry] = useState('');
  
  const { setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth({ isAuthenticated: false });
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('access_token')
    setSuccess(false)
    navigate('/')
    
  }
  
  const errRef = useRef();
  useEffect(() => {
    setErrMsg('');
  }, [email, mobileCode, mobile, password, passwordConfirmation, stateCountry])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(mobileCode);
    console.log(mobile);
    console.log(password);
    console.log(passwordConfirmation);
    console.log(stateCountry);

    try {
      const response = await axios.post('https://nimda.blazingwa.com/api/register',
        {
          email: email,
          mobile_code: '62',
          mobile: mobile,
          password: password,
          country: stateCountry,
          password_confirmation: passwordConfirmation,
          
          
        },
      );
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response));
      setEmail('');
      setPassword('');
      setMobileCode('');
      setMobile('');
      setPasswordConfirmation('');
      setStateCountry('');
      setSuccess(true);
    
    
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (error.response.status === 401) {
        setErrMsg('unauthorized');
      } else {
        setErrMsg('Register Failed (500)');
      }
     
    }


  }

 
    return (
        <>
 
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol className='mdbcol1' size='md'>
            <Nav className='brand' >
            <img
              src={logo}
                height='63.5px'
                width='219.1px'
                alt=''
                loading='lazy'/>
            </Nav>
            <div className='explanation-text'>
          <h1>What does your free trial include?</h1>
          <br />
          <br />
          <p className='text1'>For 7 days, you get access to BLAZINGWA'S Sandbox Account.</p>
          <p className='text2'>
            This means that you can use any active WhatsApp number to learn all about BLAZINGWA's exciting features like:
          </p>
         
            <li className='list-text'><img src={licheck} alt='' /><p className='text3'>Multi-Agent Inbox & Support Dashboard overview</p></li>
            <li className='list-text'><img src={licheck} alt='' /><p className='text3'>WhatsApp Broadcast (to your own number)</p></li>
            <li className='list-text'><img src={licheck} alt='' /><p className='text3'>CRM & Contact Management tour</p></li>
            <li className='list-text'><img src={licheck} alt='' /><p className='text3'>Third Party Integrations with tools like Shopify, Google Sheets, etc.</p></li>
        
            <p className='text4'>
                Our free trial is not a customer facing product.
            </p>
            <p className='text5'>
                You WILL NOT be able to
            </p>
            
            <li className='list-text'><img src={xmark} alt='' /><p className='text3'>Build Chatbot or Automation Flows</p></li>
            <li className='list-text'><img src={xmark} alt='' /><p className='text3'>Create New Templates</p></li>
            <li className='list-text'><img src={xmark} alt='' /><p className='text3'>Set up your own WhatsApp number</p></li>
            <li className='list-text'><img src={xmark} alt='' /><p className='text3'>Send messages to your customers</p></li>
            <p className='text5'>
                To use our free trial version, you do not need Facebook Verification or WhatsApp API registration.
            </p>               
          </div>
      </MDBCol>
      
                    
                    
            {/* //side 2//         */}
            {success ? (<Profile handleLogout={handleLogout} />) : (
              <MDBCol className='mdbcol2' size='md'>
                
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className='country'>
            <div>
                <img src={flag || english} alt="" style={{width: '34px', height: '34px'}} /> 
            </div>
            <NavDropdown title={language} className="basic-nav-dropdown">
            <NavDropdown.Item 
            onClick={() =>{ 
            setLanguage('English');
            setFlag(english)
                  }}>
                    English
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setLanguage('Indonesia');
                    setFlag(indo);
            }}>Indonesia</NavDropdown.Item>
            
            </NavDropdown>
            </div>
          
              <div>
                <img className='rightside' src={singup} alt='' />
              </div>
              <p className='textback' ><img  src={arrow} alt='' />    <Link className='link' to='/'>Back</Link></p>

    <Form className='form1' onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className='formlabel3'>First name*</Form.Label>
          <Form.Control
          className='formlabel'
           required 
           placeholder="Enter your first name" />
        </Form.Group>

        <Form.Group  as={Col} controlId="formGridPassword">
          <Form.Label className='formlabel3' >Last name*</Form.Label>
          <Form.Control 
          className='formlabel' 
          required 
          placeholder="Enter your last name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" >
        <Form.Label className='formlabel3'>Email</Form.Label>
        <Form.Control
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='formlabel' 
        placeholder="Enter your email" 
         />
      </Form.Group>
      
      <Form.Group as={Col}>
          <Form.Label className='formlabel3'>Country</Form.Label>
          <Form.Select
          value={stateCountry}
          required
          onChange={(e) => setStateCountry(e.target.value)} 
          className='formlabel2'
          >
            <option>Choose your country</option>
            <option>Indonesia</option>
            <option>England</option>
            <option>French</option>
            <option>Belgium</option>
          </Form.Select>
      </Form.Group>
      <br />
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label className='formlabel3'>Whatsapp Number (with country code)*</Form.Label>
        <div className='whats'>
        <img src={wa} alt='' />
        <Form.Control
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
        className='formlabel' 
        placeholder="Phone Number" 
         />
         </div>
      </Form.Group>
      
      <Row className="mb-3 password">
        <Form.Group as={Col}>
      <Form.Label className='label1'>Password</Form.Label>
       <div className='envelope'>
        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='formlabel5' 
                          required
                          placeholder="Enter your password" />
                 
        </div>
      </Form.Group>
      
      <Form.Group as={Col}>
      <Form.Label className='label1'>Confirm password</Form.Label>
       <div className='envelope position-relative'>
        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={passwordConfirmation}
                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                          className='formlabel4' 
                          required
                        placeholder="Confirm your password" />
        <span className='eye1' type='button' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <img  src={eye} alt='' /> : <img src={slasheye} alt='' /> }
                        </span>      
        </div>
        
      </Form.Group>
      
      </Row>
      
      {/* <Form.Group className="rememberme" controlId="formBasicCheckbox">
    <div className='term'>
      <div>
      <p><Form.Check type="checkbox" className='checkbox'/></p>
      </div>
      
      <div >
      <p className='test'>I agree to <a className='textt' href=' ' >Term and conditions</a>and <a className='textt' href=" ">Privacy Policy</a></p>
    </div>
      </div>
      </Form.Group> */}
 
      <Button variant="success" type="submit" className='btn btn-submit'>
        Create an account
        </Button>
      </Form>
      <br />
      
      <p>Already have an account?<NavLink className="loginn" to='/'>  Login</NavLink></p>
      <div className='download'>
        <div>
          <img src={appstore} alt='' />
        </div>
        <div>
          <img src={google} alt='' />
        </div>
      </div>
            </MDBCol> 

        )}
      
        </MDBRow>
    </MDBContainer>
       
        
        
        
          
    </>
  );
}

export default Register;