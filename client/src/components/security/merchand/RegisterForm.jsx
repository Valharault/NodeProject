import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";
import AuthService from "../../../services/auth.service";

export default function RegisterForm() {

    const [values, setValues] = useState(
        {
            firstname: null,
            lastname: null,
            phone_number: null,
            kbis: null,
            society: null,
            redirect_success: null,
            redirect_cancel: null,
            currency: null,
            email: null,
            password: null
        }
    );
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
        AuthService.merchandRegister(values).then(
            response => {
                setMessage(response.message)
                setSuccessful(true)
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.data.message)
                    setSuccessful(false)
                }
            });
    }

    return <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Inscription Marchand</h2>
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
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirmer mot de passe</label>
                    <input type="password" name="password_confirm" id="password_confirm" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" name="lastname" id="lastname" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="phone_number">Numéro de téléphone</label>
                    <input type="number" name="phone_number" id="phone_number" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="kbis">Numéro KBIS</label>
                    <input type="text" name="kbis" id="kbis" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="society">Nom de la société</label>
                    <input type="text" name="society" id="society" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="currency">Device</label>
                    <input type="text" name="currency" id="currency" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="redirect_success">Url de succès</label>
                    <input type="url" name="redirect_success" id="redirect_success" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="redirect_cancel">Url d'annulation</label>
                    <input type="url" name="redirect_cancel" id="redirect_cancel" className="form-control" required
                           onChange={handleChange}/>
                </div>
            </div>
        </div>


        <Button type="submit">S'inscrire</Button>
    </form>
}
