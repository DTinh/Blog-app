import React, { useEffect, useContext, useState } from 'react';
import './NavHeader.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                            </Nav>
                            <Nav>
                                {isShow ?
                                    <>
                                        <span className='nav-link'>Xin chào {account.username}!</span>
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