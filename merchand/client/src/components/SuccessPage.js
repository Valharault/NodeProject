import React from "react";
import Header from "./Header";
import {Alert, Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

function SuccessPage() {
    return (
        <div>
            <Header/>
            <Container>
                <Alert variant="success" className={"mt-5"}>
                    <Alert.Heading>Merci pour votre achat</Alert.Heading>
                    <Link to={"/boutique"}><Button>Retour à la boutique</Button></Link>
                </Alert>
            </Container>
        </div>
    );
}

export default SuccessPage;
