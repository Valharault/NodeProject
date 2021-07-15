import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import LoginForm from './security/merchand/LoginForm';
import RegisterForm from './security/merchand/RegisterForm';

export default function Body() {
    const [user, setUser] = useState(null)

    useEffect(function () {
       setUser(false)
    }, [])

    if (user === null) {
        return null;
    }

    return (
        user ? <Container /> : <RegisterForm onConnect={setUser} />
    );
}
