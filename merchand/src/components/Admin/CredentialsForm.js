import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";

const defaultV = {
    clientId: "",
    clientSecret: "",
};

export default function CredentialsForm({onSubmit, defaultValues}) {
    const [values, setValues] = useState(defaultValues || defaultV);

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
        <Form onSubmit={(event) => {
            event.preventDefault();
            _onSubmit();
        }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Client Id</Form.Label>
                <Form.Control value={values.clientId}
                              onChange={handleChange}
                              name="clientId"
                              type="text"
                              placeholder="Enter your clientId"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Client Secret</Form.Label>
                <Form.Control value={values.clientSecret}
                              onChange={handleChange}
                              type="password"
                              name="clientSecret"
                              placeholder={"Enter your client secret"}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Enregistrer
            </Button>
        </Form>
    );
}
