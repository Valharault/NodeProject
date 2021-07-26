import React, {useState} from "react";
import {Form, Button} from "react-bootstrap"

const defaultV = {
    name: "",
    quantity: 0,
    unitPrice: 0,
};

export default function FormCart({onSubmit, item}) {
    const [values, setValues] = useState(item || defaultV);

    const _onSubmit = () => {
        onSubmit({...values});
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Form
            onSubmit={(event) => {
                event.preventDefault();
                _onSubmit();
            }}
        >

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control value={values.name} onChange={handleChange} name="name"
                              placeholder="Nom du produit"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Quantité</Form.Label>
                <Form.Control value={values.quantity}
                              onChange={handleChange}
                              type="number"
                              name="quantity"
                              placeholder={"Quantité"}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Prix</Form.Label>
                <Form.Control value={values.unitPrice}
                              onChange={handleChange}
                              type="number"
                              name="unitPrice"
                              placeholder={"Prix"}
                />
            </Form.Group>
            <a onClick={(e) => _onSubmit()}><Button variant={"success"}>Appliquer</Button></a>
        </Form>
    );
}
