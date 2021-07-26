import React, {useContext} from "react";
import {ListContext} from "../../contexts/ListContext";
import {Link} from "react-router-dom";
import {ButtonGroup, Button} from "react-bootstrap";

export default function ListItem({item, onEdit}) {
    const {deleteElement} = useContext(ListContext);

    return (
        <tr>
            <td><Link to={`/items/${item.id}`}>{item.name}</Link></td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>
                <ButtonGroup>
                    <Button variant="warning" onClick={() => onEdit(item)}>Editer</Button>
                    <Button variant="danger" onClick={() => deleteElement(item)}>Supprimer</Button>
                </ButtonGroup>
            </td>
        </tr>
    );
}
