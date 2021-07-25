import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";


export default function AdminTransactionsShow() {

    const { id } = useParams();

    const [list, setList] = useState([])

    const ListStatus = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Statut</th>
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (
                item.transactionsStatus.map(status => (
                <tr>
                    <td>{status.status} </td>
                    <td>{status.createdAt}</td>
                </tr>

                ))))}
            </tbody>
        </table>
    );

    const ListOperations = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Montant</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (
                item.Operations.map(status => (
                    <tr>
                        <td>{status.amount} </td>
                        <td>{status.type} </td>
                        <td>{status.createdAt}</td>
                    </tr>

                ))))}
            </tbody>
        </table>
    );


    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(`http://localhost:4000/api/admin/transactions/${id}/all`)
            .then(res => {
                console.log(res.data)
                setList(res.data[0])
            })

    }, []);

    return <div className={"container"}>
        <h1 className="mt-5 mb-5">Transaction : {id} </h1>
        <div className={"row"}>
            <div className={"col-6"}>
                Historique de statuts de transactions
                <ListStatus list={list}></ListStatus>
            </div>
            <div className={"col-6"}>
                Historique des opérations
                <ListOperations list={list}></ListOperations>
            </div>
        </div>
    </div>
}
