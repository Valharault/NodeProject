import React from "react";
import Header from "./Header";
import {Alert, Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

function CancelPage() {
    return (
        <div>
            <Header/>
            <Container>
                <Alert variant="danger" className={"mt-5"}>
                    <Alert.Heading>Paiement annulé</Alert.Heading>
                    <Link to={"/boutique"}><Button>Retour à la boutique</Button></Link>
                </Alert>
            </Container>
        </div>
    );
}

export default CancelPage;
