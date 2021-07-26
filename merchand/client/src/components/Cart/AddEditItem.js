import React, {useContext, useState, useEffect} from "react";
import {ListContext} from "../../contexts/ListContext";
import {Button} from "react-bootstrap"
import Modal from "../lib/Modal";
import FormCart from "./Form";

export default function AddEditItem({selectedItem = false}) {
    const {editElement, addElement} = useContext(ListContext);

    const [modal, setModal] = useState(selectedItem);

    useEffect(() => setModal(selectedItem), [selectedItem]);

    const handleSubmit = (values) => {
        if (modal === true) addElement(values);
        else editElement(values);
        setModal(false);
    };

    return (
        <>
            <Button variant={"success"} onClick={() => setModal(true)}>Ajouter un nouvel article</Button>
            <Modal
                title="Ajout d'un produit"
                open={Boolean(modal)}
                onClose={() => setModal(false)}
            >
                <FormCart onSubmit={handleSubmit} item={modal !== true && modal}/>
            </Modal>
        </>
    );
}
