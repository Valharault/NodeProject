import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";


export default function AdminTransactionsShow() {

    const { id } = useParams();

    const [transStatus, setTransStatus] = useState([])
    const [operation, setOperation] = useState([])
    const [operationStatus, setOperationStatus] = useState([])

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
                <tr>
                    <td>{item.status} </td>
                    <td>{item.createdAt}</td>
                </tr>
                ))}
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
                    <tr>
                        <td>{item.amount} </td>
                        <td>{item.type} </td>
                        <td>{item.createdAt}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    );


    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        // GET request using axios inside useEffect React hook
        axios.get(`http://localhost:4000/api/admin/transaction/${id}`, config)
            .then(res => {
                setTransStatus(res.data[0])
                setOperation(res.data[1])
                setOperationStatus(res.data[2])
            })

    }, []);

    return <div className={"container"}>
        <h1 className="mt-5 mb-5">Transaction : {id} </h1>
        <div className={"row"}>
            <div className={"col-6"}>
                Historique de statuts de transactions
                <ListStatus list={transStatus}></ListStatus>
            </div>
            <div className={"col-6"}>
                Historique des opérations
                <ListOperations list={operation}></ListOperations>
            </div>
        </div>
    </div>
}
