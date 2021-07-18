import React from 'react';
import './App.css';
import Header from "./views/Header";
import Body from "./views/Body";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/security/merchand/LoginForm";
import RegisterForm from "./components/security/merchand/RegisterForm";
import AdminLoginForm from "./components/security/admin/AdminLoginForm";
import AdminValidAccount from "./components/security/admin/AdminValidAccount";
import Logout from "./components/security/Logout";

export default function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Header/>
                        <Body/>
                    </Route>
                    <Route exact path="/connexion">
                        <Header/>
                        <LoginForm/>
                    </Route>
                    <Route exact path="/inscription">
                        <Header/>
                        <RegisterForm/>
                    </Route>
                    <Route exact path="/admin">
                        <Header/>
                        <AdminLoginForm/>
                    </Route>
                    <Route exact path="/admin/account">
                        <Header/>
                        <AdminValidAccount/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

