import { Container, Row } from "react-bootstrap";
import './dashboard.css';
import React from "react";
import { Link } from "react-router-dom";



function Dashboard({ handleLogout }) {



return (

    <>
        <Container fluid className="container">
            <Row>
                <h1>You're success for logged in.</h1>
               
                <Link to='/'  onClick={handleLogout} type='button'>Logout
                    
                </Link>
            </Row>
        </Container>
    </>
  )
}

export default Dashboard;