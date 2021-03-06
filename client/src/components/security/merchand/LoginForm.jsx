import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import AuthService from "./../../../services/auth.service";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function LoginForm() {
    const [message, setMessage] = useState(null)
    const [successful, setSuccessful] = useState(false)

    const history = useHistory();


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async function (data) {
        console.log(data.email)
        AuthService.merchandLogin(
            data.email,
            data.password
        ).then(
            response => {
                setMessage(response.message)
                setSuccessful(true)
                history.push("/merchand/account")
                window.location.reload()
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.data.message)
                    setSuccessful(false)
                }
            });
    }

    return <form className="container mt-4" onSubmit={handleSubmit(onSubmit)}>
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
            <input className={'form-control'} type="email" placeholder="Email" {...register("email", {required: true})} />
            {errors.email && <p>L'email n'est pas valide</p>}
        </div>
        <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input className={'form-control'} type="password" placeholder="Mot de passe" {...register("password", {required: true})} />
            {errors.password && <p>Veuillez renseigner un mot de passe</p>}
        </div>
        <Button type="submit">Connexion</Button>
    </form>
}
