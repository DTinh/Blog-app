import React, { useEffect, useContext, } from 'react';
import './NavHeader.scss';
import { NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../assets/img/logo.png';
const NavHeader = (props) => {
    // const location = useLocation();
    // if (user && user.isAuthenticated === true || location.pathname === '/') {
    return (
        <>
            {/* <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/users">User</NavLink>
                <NavLink to="/projects">Project</NavLink>
                <NavLink to="/about">About</NavLink>
            </div> */}

            <div className='nav-header'>
                <Navbar expand="lg" className="bg-header">
                    <Container>
                        <Navbar.Brand href="/">Blog App
                            <img className='mx-1'
                                src={Logo}
                                width='20'
                                height='20'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="/" exact className='nav-link'>Home</Nav.Link> */}
                            </Nav>
                            <Form inline className='nav-search'>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            className=" mr-sm-2"
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit" variant="light" href="/create" >Create</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Nav>
                                <Nav.Link className='nav-link'>Welcome DTinh!</Nav.Link>
                                <NavDropdown title="Setting" id="basic-nav-dropdown" className='navdropdown-item'>
                                    <NavDropdown.Item href="#action/3.1" >Change Password</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );


}

export default NavHeader; 