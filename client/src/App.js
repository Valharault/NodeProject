import React from 'react';
import './App.css';
import Header from "./components/Header";
import Body from "./components/Body";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/security/merchand/LoginForm";
import RegisterForm from "./components/security/merchand/RegisterForm";
import AdminLoginForm from "./components/security/admin/AdminLoginForm";
import AdminValidAccount from "./components/admin/AdminValidAccount";
import AdminShowAccount from "./components/admin/AdminShowAccount";
import Admin from "./components/admin/Admin";
import HeaderAdmin from "./components/HeaderAdmin"
import AdminTransactions from "./components/admin/AdminTransactions";
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
                <Route exact path="/admin/login">
                    <Header />
                    <AdminLoginForm />
                </Route>
                <Route exact path="/admin/account">
                    <HeaderAdmin />
                    <AdminValidAccount/>
                </Route>
                <Route exact path="/admin/merchand/:id">
                    <HeaderAdmin />
                    <AdminShowAccount/>
                </Route>
                <Route exact path="/admin">
                    <HeaderAdmin />
                    <Admin/>
                </Route>
                <Route exact path="/admin/transactions">
                    <HeaderAdmin />
                    <AdminTransactions/>
                </Route>
            </Switch>
            </BrowserRouter>
        </div>
    );
};

