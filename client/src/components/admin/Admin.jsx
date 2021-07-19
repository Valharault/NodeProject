import React, {useEffect, useState} from 'react';
import {Alert, Button, Tab, Tabs} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {set} from "react-hook-form";
import AdminChart from "./AdminChart";

export default function Admin() {

    const [account, setAccount] = useState([])

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/admin/dashboard')
            .then(res => {
                setAccount(res.data)
            })

    }, []);


    return <div className={"container mb-5"}>
        <h1 className="mt-5 mb-5">Dashboard</h1>

        <div className={"row"}>
        <div className={"col-4"}>
            <div className={"box-value box-light-red"}>
            <span className={"box-title"}>
                Nombre d'inscription
            </span>
                <span className={"box-data"}>
                    5
                </span>
            </div>
        </div>
            <div className={"col-4"}>
        <div className={"box-value box-light-blue"}>
            <span className={"box-title"}>
                Nombre de transactions
            </span>
            <span className={"box-data"}>
                0
            </span>
        </div>
            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-green"}>
            <span className={"box-title"}>
                Panier moyen
            </span>
                    <span className={"box-data"}>
                        0
                    </span>
                </div>

            </div>
        </div>

        <AdminChart value={account}/>

        </div>
}