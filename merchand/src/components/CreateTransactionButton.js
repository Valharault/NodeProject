import React, {useContext} from "react";
import {ListContext} from "../contexts/ListContext";
import {Button} from "react-bootstrap";
import {CredentialContext} from "../contexts/CredentialContext";

export default function CreateTransactionButton() {
    const {list, totalPrice} = useContext(ListContext);
    const {token} = useContext(CredentialContext);

    const createTransaction = () => {
        const data = {
            consumer: {
                lastname: "Foo",
                firstname: "Bart",
            },
            billingAddress: {
                address: "1 rue Bouvier",
                zipCode: "75011",
                city: "Paris",
                country: "France",
            },
            cart: list,
            totalPrice,
            currency: "EUR",
            shippingAddress: {
                address: "1 rue Bouvier",
                zipCode: "75011",
                city: "Paris",
                country: "France",
            },
        };

        fetch("http://localhost:4000/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <Button variant={"success"} onClick={() => createTransaction()}>Soumettre ma commande</Button>
    );
}
