import React, {useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {CredentialContext} from "../contexts/CredentialContext";
import {Link} from "react-router-dom";

function MerchandTransaction() {
    const {token} = useContext(CredentialContext);
    const [list, setList] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/api/merchand/transactions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token
            }
        })
            .then((res) => res.json())
            .then((data) => setList(data))
    }, []);

    const refund = (item) => {
        fetch("http://localhost:4000/api/merchand/transactions/refund/" + item.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token
            }
        })
            .then((res) => res.json())
            .then((data) => console.log())
    }

    return (
        <Container>
            <h1>Mes transactions</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Transaction Id</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Prix Total</th>
                    <th>Créer le</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {list.map(item => (
                    <tr key={item.id}>
                        <td>#{item.id}</td>
                        <td>{item.customer_lastname}</td>
                        <td>{item.customer_firstname}</td>
                        <td>{item.email}</td>
                        <td>{item.total_price}</td>
                        <td>{item.createdAt}</td>
                        <td>
                            <ButtonGroup>
                                <Link to={`/transaction/${item.id}`}><Button variant="info">Voir</Button></Link>
                                <Button variant="warning" onClick={() => refund(item)}>Rembourser</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default MerchandTransaction;
