import React from 'react';
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function HeaderMerchand() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"/admin"} className="nav-link" activeClassName="active">Dashboard</Link>
                        <Link to={"/admin/account"} className="nav-link" activeClassName="active">Marchands</Link>
                        <Link to={"/admin/transactions"} className="nav-link" activeClassName="active">Transactions</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
