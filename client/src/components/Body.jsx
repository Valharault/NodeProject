import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import AdminLoginForm from './security/admin/AdminLoginForm';
import RegisterForm from './security/merchand/RegisterForm';
import LoginForm from './security/merchand/LoginForm';

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
