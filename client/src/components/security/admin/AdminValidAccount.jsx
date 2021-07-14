import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

export default function AdminValidAccount () {

    const handleClick = async function (event) {
        event.preventDefault()
        axios.post(`http://localhost:4000/security/credentials`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return <div>
            <Button type="button" className="mt-5" onClick={handleClick}>Générer credentials</Button>
    </div>
}
