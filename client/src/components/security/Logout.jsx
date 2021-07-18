import React from 'react';
import AuthService from "./../../services/auth.service"
import {useHistory} from "react-router-dom";

export default function Logout() {
    const history = useHistory();
    AuthService.logout()
    history.push("/")
    window.location.reload()
}
