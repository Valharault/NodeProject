import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function DefaultNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>BackOffice</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/connexion"} className="nav-link">Connexion</Link>
                        <Link to={"/inscription"} className="nav-link">Inscription</Link>
                        <Link to={"/admin/login"} className="nav-link">Login Admin</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
