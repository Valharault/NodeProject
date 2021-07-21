import React, {useEffect, useState} from 'react';
import axios from "axios";
import AdminChart from "./AdminChart";

export default function Admin() {

    const Select = ({account}) => (
        <div className={"form-group col-4"}>
            <select className="form-control" onChange={handleChange} aria-label="Default select example">
                <option selected>Sélectionner un marchand</option>
                {
                    account.map(item => (

                        <option id={item.id}> {item.email}</option>

                    ))
                }
            </select>
        </div>
    );

    const handleChange = async function (event) {
        setMerchand(event.target.value)
    }

    const [account, setAccount] = useState([])
    const [option, setOption] = useState([])
    const [merchand, setMerchand] = useState('');


    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/admin/dashboard')
            .then(res => {
                console.log(res.data);
                setAccount(res.data)
                setOption(res.data[3])
            })

    }, []);

        return <div className={"container mb-5"}>
            <h1 className="mt-5 mb-5">Dashboard</h1>
            <Select account={option}/>
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