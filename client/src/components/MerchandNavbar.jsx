import React, {useState} from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service"

export default function MerchandNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">BackOffice</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/merchand/account"} className="nav-link">Mon compte</Link>
                        <Link to={"/logout"} className="nav-link">Déconnexion</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
