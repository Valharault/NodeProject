import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import {useForm} from "react-hook-form";

export default function RegisterForm() {

    const [message, setMessage] = useState(null)
    const [successful, setSuccessful] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async function (data) {
        AuthService.merchandRegister(data).then(
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

    return <form className="container mt-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <input className={'form-control'} type="email" placeholder="Email" {...register("email", {required: true})} />
                    {errors.email && <p>L'email n'est pas valide</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input className={'form-control'} type="password" placeholder="Mot de passe" {...register("password", {required: true})} />
                    {errors.password && <p>Veuillez renseigner un mot de passe</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirmer mot de passe</label>
                    <input className={'form-control'} type="password" placeholder="Confirmer" {...register("password_confirm", {required: true})} />
                    {errors.password_confirm && <p>Veuillez confimer votre mot de passe</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="lastname">Nom</label>
                    <input className={'form-control'} type="text" placeholder="Nom" {...register("lastname", {required: true})} />
                    {errors.lastname && <p>Veuillez renseigner un nom</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input className={'form-control'} type="text" placeholder="Prénom" {...register("firstname", {required: true})} />
                    {errors.firstname && <p>Veuillez renseigner un prénom</p>}

                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="phone_number">Numéro de téléphone</label>
                    <input className={'form-control'}  type="tel" placeholder="Numéro de téléphone" {...register("phone_number", {required: true, minLength: 6, maxLength: 12})} />
                    {errors.phone_number && <p>Veuillez renseigner un numéro de téléphone</p>}

                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="kbis">Numéro KBIS</label>
                    <input className={'form-control'}  type="text" placeholder="kbis" {...register("kbis", {required: true})} />
                    {errors.kbis && <p>Veuillez renseigner un KBIS</p>}

                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="society">Nom de la société</label>
                    <input className={'form-control'} type="text" placeholder="Nom de la société" {...register("society", {required: true})} />
                    {errors.society && <p>Veuillez renseigner un nom de société</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="currency">Device</label>
                    <select className={'form-control'} {...register("currency", { required: true })}>
                        <option value="Euro">Euro</option>
                        <option value="Dollar">Dollar</option>
                    </select>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="redirect_success">Url de succès</label>
                    <input className={'form-control'} type="url" placeholder="Url de succès" {...register("redirect_success", {required: true})} />
                    {errors.redirect_success && <span>Veuillez renseigner une url de succès</span>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="redirect_cancel">Url d'annulation</label>
                    <input className={'form-control'} type="url" placeholder="Url d'annulation" {...register("redirect_cancel", {required: true})} />
                    {errors.redirect_cancel && <p>Veuillez renseigner une url d'annulation</p>}
                </div>
            </div>
        </div>


        <Button type="submit">S'inscrire</Button>
    </form>
}
