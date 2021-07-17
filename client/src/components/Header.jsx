import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/connexion"} className="nav-link">Connexion</Link>
                        <Link to={"/inscription"} className="nav-link">Inscription</Link>
                        <Link to={"/admin"} className="nav-link">Login Admin</Link>
                        <Link to={"/admin/account"} className="nav-link">Admin account</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
