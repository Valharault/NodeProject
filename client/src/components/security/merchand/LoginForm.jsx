import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import AuthService from "./../../../services/auth.service";

export default function LoginForm() {

    const [values, setValues] = useState({email: null, password: null});
    const [message, setMessage] = useState(null)
    const [successful, setSuccessful] = useState(false)

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async function (event) {
        event.preventDefault()
        AuthService.merchandLogin(
            values.email,
            values.password
        ).then(
            response => {
                setMessage(response.message)
                setSuccessful(true)
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.message)
                    setSuccessful(false)
                }
            });
    }

    return <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Connexion Marchand</h2>
        {message && (
            <div className="form-group">
                <div
                    className={
                        successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                    }
                    role="alert"
                >
                    {message}
                </div>
            </div>
        )}
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
        <Button type="submit">Se connecter</Button>
    </form>
}
