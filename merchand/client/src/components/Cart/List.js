import React, {useContext, useState} from "react";
import {ListContext} from "../../contexts/ListContext";
import AddEditItem from "./AddEditItem";
import ListItem from "./ListItem";
import CreateTransactionButton from "../CreateTransactionButton";
import {Button, Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {CredentialContext} from "../../contexts/CredentialContext";

export default function List() {
    const {list, totalPrice} = useContext(ListContext);
    const {token} = useContext(CredentialContext);
    const [selectedItem, setSelectedItem] = useState(false);
    const [values, setValues] = useState();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onEdit = (item) => {
        setSelectedItem(item);
    };

    return (
        token && (
            <div>
                <AddEditItem selectedItem={selectedItem}/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item) => (
                        <ListItem key={item.id} item={item} onEdit={onEdit}/>
                    ))}
                    </tbody>
                </Table>
                <Form>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control onChange={handleChange} name="firstname" type="text" required placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control onChange={handleChange} name="lastname" type="text" required placeholder=""/>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleChange} name="email" type="email" required placeholder=""/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Device</Form.Label>
                            <Form.Control onChange={handleChange} name="device" type="email" placeholder=""/>
                        </Form.Group>

                        <h4>Adresse de facturation</h4>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Addresse</Form.Label>
                                <Form.Control onChange={handleChange} name="billingAddress" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control onChange={handleChange} name="billingZipcode" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control onChange={handleChange} name="billingCity" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Pays</Form.Label>
                                <Form.Control onChange={handleChange} name="billingCountry" type="text" placeholder=""/>
                            </Form.Group>
                        </div>

                        <h4>Adresse de livraison</h4>

                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Addresse</Form.Label>
                                <Form.Control onChange={handleChange} name="shippingAddress" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control onChange={handleChange} name="shippingZipcode" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control onChange={handleChange} name="shippingCity" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                        <div className={"col-md-6"}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Pays</Form.Label>
                                <Form.Control onChange={handleChange} name="shippingCountry" type="text" placeholder=""/>
                            </Form.Group>
                        </div>
                    </div>
                </Form>

                <p>Prix Total: {totalPrice}</p>
                <CreateTransactionButton values={values}/>
            </div>
        ) ||
        !token && (
            <>
                <p>Vous devez être connecté pour soumettre une commande</p>
                <Link to={"/mon-compte"}><Button>Se connecter</Button></Link>
            </>
        )
    );
}
