import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {CredentialContext} from "../contexts/CredentialContext";

function Header() {

    const {token} = useContext(CredentialContext);

    function Logout() {
        localStorage.removeItem("credential");
        window.location.reload()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Site Marchand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/boutique">Boutique</Nav.Link>
                        {!token && (
                            <Nav.Link as={Link} to="/">Connexion</Nav.Link>
                        )}
                        {
                            token && (
                                <NavDropdown title="Marchand" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to={"/transactions"}>Mes transactions</NavDropdown.Item>
                                    <NavDropdown.Item onClick={Logout}>Déconnexion</NavDropdown.Item>
                                </NavDropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
