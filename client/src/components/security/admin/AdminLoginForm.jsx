import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

export default function AdminLoginForm () {

    const [values, setValues] = useState(
        {
            email: null,
            password: null
        }
    );

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async function (event) {
        event.preventDefault()
        axios.post(`http://localhost:4000/admin/security/login`, values)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Connexion Admin</h2>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" className="form-control" required
                   onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" className="form-control" required
                   onChange={handleChange}/>
        </div>
        <Button type="submit">Connexion</Button>
    </form>
}
