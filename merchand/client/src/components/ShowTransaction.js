import React, {useContext, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {ListContext} from "../contexts/ListContext";
import {CredentialContext} from "../contexts/CredentialContext";
import {Container, Form} from "react-bootstrap";

export default function ShowTransaction() {

    const { id } = useParams();

    const {token} = useContext(CredentialContext);

    const [transaction, setTransaction] = useState(null)
    useEffect(() => {
        fetch("http://localhost:4000/api/merchand/transactions/"+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token
            }
        })
            .then((res) => res.json())
            .then((data) => setTransaction(data))
    }, []);

    return (
        <>
            {!transaction && "Chargement ...."}
            {transaction && (
                <Container>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_lastname}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_firstname}/>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" disabled value={transaction.email}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Devise</Form.Label>
                            <Form.Control type="text" disabled value={transaction.currency}/>
                        </Form.Group>

                        <h4>Adresse de facturation</h4>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Addresse</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_billing_address}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_billing_zipcode}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_billing_city}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pays</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_billing_country}/>
                            </Form.Group>
                        </div>

                        <h4>Adresse de livraison</h4>

                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Addresse</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_shipping_address}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_shipping_zipcode}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_shipping_city}/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pays</Form.Label>
                                <Form.Control type="text" disabled value={transaction.customer_shipping_country}/>
                            </Form.Group>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
