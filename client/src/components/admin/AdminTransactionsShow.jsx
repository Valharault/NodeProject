import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";


export default function AdminTransactionsShow() {

    const { id } = useParams();

    const [transStatus, setTransStatus] = useState([])
    const [operation, setOperation] = useState([])
    const [operationStatus, setOperationStatus] = useState([])
    const [countOperation, setCountOperation] = useState(0)
    const [nbItems, setNbItems] = useState(0)
    const [price, setPrice] = useState(0)


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
                console.log(res.data);
                setTransStatus(res.data[0])
                setOperation(res.data[1])
                setOperationStatus(res.data[2])
                setCountOperation(res.data[3])
                setNbItems(res.data[4][0].nbItems)
                setPrice(res.data[5][0].total_price)
            })

    }, []);

    return <div className={"container"}>
        <h1 className="mt-5 mb-5">Transaction : {id} </h1>
        <div className={"row mb-5"}>
            <div className={"col-4"}>
                <div className={"box-value box-light-red"}>
                        <span className={"box-title"}>
                    Nombre d'opérations
                        </span>
                    <span className={"box-data"}>
                        {countOperation}
                </span>
                </div>
            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-blue"}>
            <span className={"box-title"}>
                Nombre d'articles
            </span>
                    <span className={"box-data"}>
                        {nbItems}
            </span>
                </div>
            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-green"}>
            <span className={"box-title"}>
                Prix total
            </span>
                    <span className={"box-data"}>
                        {price}
                    </span>
                </div>

            </div>
        </div>
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
