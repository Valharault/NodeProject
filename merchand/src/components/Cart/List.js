import React, {useContext, useState} from "react";
import {ListContext} from "../../contexts/ListContext";
import AddEditItem from "./AddEditItem";
import ListItem from "./ListItem";
import CreateTransactionButton from "../CreateTransactionButton";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {CredentialContext} from "../../contexts/CredentialContext";

export default function List() {
    const {list, totalPrice} = useContext(ListContext);
    const {token} = useContext(CredentialContext);

    const [selectedItem, setSelectedItem] = useState(false);

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

                <p>Prix Total: {totalPrice}</p>
                <CreateTransactionButton/>
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
