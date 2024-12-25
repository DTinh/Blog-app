import React, { useEffect, useContext, useState } from 'react';
import './NavHeader.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../assets/img/logo.png';
import _ from 'lodash';
import { useHistory } from "react-router-dom";


const NavHeader = (props) => {
    const [isShow, setIsShow] = useState(false);
    const [account, setAccount] = useState({});
    const [username, setUsername] = useState('');
    let history = useHistory();

    const handleLogout = () => {
        sessionStorage.removeItem("account");
        window.location.reload();
    }
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, [])
    useEffect(() => {
        isShowLogout();
    }, [account])
    const isShowLogout = () => {
        if (account && !_.isEmpty(account) && account.isAuthenticated) {
            setIsShow(true)
        } else {
            setIsShow(false)
        }
    }
    const handleLogin = () => {
        history.push("/login");
    }

    return (
        <>
            <div className='nav-header fixed-top'>
                <Navbar expand="lg" className="bg-header">
                    <Container>
                        <Navbar.Brand href="/"
                        >
                            Blog App
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
                                        <Button type="submit" variant="light"
                                        >Search</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Nav>
                                {isShow ?
                                    <>
                                        <span className='nav-link'>Welcome {account.username}!</span>
                                        <button className='nav-link btn btn-info'
                                            onClick={() => handleLogout()}
                                        >Logout</button>
                                    </>
                                    : <>
                                        <button className='nav-link btn btn-info'
                                            onClick={() => handleLogin()}
                                        >Login</button>
                                    </>
                                }

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );


}

export default NavHeader; 