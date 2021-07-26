import React from 'react';
import './App.css';
import Header from "./views/Header";
import Body from "./views/Body";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/security/merchand/LoginForm";
import RegisterForm from "./components/security/merchand/RegisterForm";
import AdminLoginForm from "./components/security/admin/AdminLoginForm";
import Logout from "./components/security/Logout";
import AdminValidAccount from "./components/admin/AdminValidAccount";
import AdminShowAccount from "./components/admin/AdminShowAccount";
import Admin from "./components/admin/Admin";
import AdminTransactions from "./components/admin/AdminTransactions";
import AdminTransactionsShow from "./components/admin/AdminTransactionsShow";

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
                    <Route exact path="/admin/login">
                        <Header/>
                        <AdminLoginForm/>
                    </Route>
                    <Route exact path="/admin/account">
                        <Header/>
                        <AdminValidAccount/>
                    </Route>
                    <Route exact path="/admin/merchand/:id">
                        <Header/>
                        <AdminShowAccount/>
                    </Route>
                    <Route exact path="/admin">
                        <Header/>
                        <Admin/>
                    </Route>
                    <Route exact path="/admin/transactions">
                        <Header/>
                        <AdminTransactions/>
                    </Route>
                    <Route exact path="/admin/transactions/:id" >
                        <Header/>
                        <AdminTransactionsShow/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

