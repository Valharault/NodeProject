import "./App.css";
import Page from "./components/Page";
import Header from "./components/Header";
import Credentials from "./components/Admin/Credentials";
import CredentialProvider from "./contexts/CredentialContext";
import ListProvider from "./contexts/ListContext";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import CancelPage from "./components/CancelPage";
import SuccessPage from "./components/SuccessPage";
import MerchandTransaction from "./components/MerchandTransaction";
import React from "react";
import ShowTransaction from "./components/ShowTransaction";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CredentialProvider>
                    <Switch>
                        <Route exact path="/">
                            <Header/>
                            <Container>
                                <Credentials/>
                            </Container>
                        </Route>
                        <ListProvider>
                            <Route exact path="/boutique">
                                <Page/>
                            </Route>
                            <Route exact path="/transactions">
                                <Header/>
                                <MerchandTransaction/>
                            </Route>
                            <Route exact path="/transaction/:id">
                                <Header />
                                <ShowTransaction />
                            </Route>
                            <Route exact path="/paiement/cancel">
                                <CancelPage/>
                            </Route>
                            <Route exact path="/paiement/success">
                                <SuccessPage/>
                            </Route>
                        </ListProvider>
                    </Switch>
                </CredentialProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
