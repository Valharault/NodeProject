import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {apiFetch} from "../utils/api";

export default function LoginForm({onConnect}) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async function (e) {
        setError(null)
        setLoading(true)
        e.preventDefault()
        const data = new FormData(e.target)
        try {
            const user = await apiFetch('/login', {
                method: 'POST',
                body: data,
            })
            onConnect(user)
        } catch (e) {
            console.error(e)
            setLoading(false)
        }
    }

    return <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        {error && <Alert>{error}</Alert>}
        <div className="form-group">
            <label htmlFor="email">Nom d'utilisateur</label>
            <input type="text" name="email" id="email" className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" className="form-control" required/>
        </div>
        <Button type="submit" loading={loading}>Se connecter</Button>
    </form>
}

function Alert({children}) {
    return <div className="alert alert-danger">
        {children}
    </div>
}
