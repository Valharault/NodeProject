import "./App.css";
import Page from "./components/Page";
import Header from "./components/Header";
import ShowItem from "./components/Cart/ShowItem";
import Credentials from "./components/Admin/Credentials";
import CredentialProvider from "./contexts/CredentialContext";
import ListProvider from "./contexts/ListContext";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import CancelPage from "./components/CancelPage";
import SuccessPage from "./components/SuccessPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CredentialProvider>
                    <Switch>
                        <Route exact path="/mon-compte">
                            <Header/>
                            <Container>
                                <Credentials/>
                            </Container>
                        </Route>
                        <ListProvider>
                            <Route exact path="/boutique">
                                <Page/>
                            </Route>
                            <Route exact path="/items/:id">
                                <Header/>
                                <ShowItem/>
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
