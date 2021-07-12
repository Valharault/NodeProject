import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import LoginForm from './LoginForm';
import {apiFetch} from "../utils/api";

export default function Body() {
    const [user, setUser] = useState(null)

    useEffect(function () {
       setUser(false)
    }, [])

    if (user === null) {
        return null;
    }

    return (
        user ? <Container /> : <LoginForm onConnect={setUser} />
    );
}
