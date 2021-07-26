import React, {useContext} from "react";
import {ListContext} from "../contexts/ListContext";
import {Button} from "react-bootstrap";
import {CredentialContext} from "../contexts/CredentialContext";

export default function CreateTransactionButton({values}) {
    const {list, totalPrice} = useContext(ListContext);
    const {token} = useContext(CredentialContext);

    const createTransaction = () => {
        const data = {
            consumer: {
                lastname: values.lastname,
                firstname: values.firstname,
                email: values.email
            },
            billingAddress: {
                address: values.billingAddress,
                zipCode: values.billingZipcode,
                city: values.billingCity,
                country: values.billingCountry,
            },
            cart: list,
            totalPrice,
            currency: values.device,
            shippingAddress: {
                address: values.shippingAddress,
                zipCode: values.shippingZipcode,
                city: values.shippingCity,
                country: values.shippingCountry,
            },
        };
        console.log(values)
        fetch("http://localhost:4000/api/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => window.location.href = data.url);
    };

    return (
        <Button variant={"success"} onClick={() => createTransaction()}>Soumettre ma commande</Button>
    );
}
