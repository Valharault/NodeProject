import React from "react";
import Header from "./Header";
import Shop from "./Shop";
import {Container} from "react-bootstrap";

function Page() {
    return (
        <div>
            <Header/>
            <Container>
                <Shop/>
            </Container>
        </div>
    );
}

export default Page;
