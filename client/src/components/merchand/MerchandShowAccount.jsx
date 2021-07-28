import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

export default function MerchandShowAccount() {

    const { id } = useParams();

    const [data, setData] = useState([])

    const InfoList = ({ data }) => (

        <div className={"container mt-5"}>
            <div className="card">
                <h5 className="card-header">Information du compte : {data.email}</h5>
                <div className="card-body">
                    <p className="card-text">
                        Prénom : {data.firstname} <br></br>
                        Nom : {data.lastname}<br></br>
                        Téléphone : {data.phone_number} <br></br>
                        KBIS : {data.kbis}<br></br>
                        Société : {data.society} <br></br>
                        client_id : {data.client_id}<br></br>
                        client_secret : {data.client_secret}<br></br>
                    </p>
                </div>
            </div>
        </div>
    );



    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        // GET request using axios inside useEffect React hook
        axios.get(`http://localhost:4000/api/merchand/`, config)
            .then(res => {
                console.log(res.data)
                setData(res.data);
            })

    }, []);

    return (
            <InfoList data={data} />
    );
}
