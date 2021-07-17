import React from 'react';
import './App.css';
import Header from "./components/Header";
import Body from "./components/Body";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/security/merchand/LoginForm";
import RegisterForm from "./components/security/merchand/RegisterForm";
import AdminLoginForm from "./components/security/admin/AdminLoginForm";
import AdminValidAccount from "./components/security/admin/AdminValidAccount";

export default function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Switch>
                <Route exact path='/' >
                <Header/>
                    <Body/>
                </Route>
                <Route exact path="/connexion">
                    <Header />
                    <LoginForm />
                </Route>
                <Route exact path="/inscription">
                    <Header />
                    <RegisterForm />
                </Route>
                <Route exact path="/admin">
                    <Header />
                    <AdminLoginForm />
                </Route>
                <Route exact path="/admin/account">
                    <Header />
                    <AdminValidAccount/>
                </Route>
            </Switch>
            </BrowserRouter>
        </div>
    );
};

