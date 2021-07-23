import React, {useContext} from "react";
import {CredentialContext} from "../../contexts/CredentialContext";
import CredentialsForm from "./CredentialsForm";
import {Alert, Button} from "react-bootstrap";

export default function Credentials() {
    const {token, save, decodeCredentials} = useContext(CredentialContext);

    function Logout() {
        localStorage.removeItem("credential");
        window.location.reload()
    }

    return (
        <>
            {token && (
                <Alert variant="success" className={"mt-5"}>
                    <Alert.Heading>Bonjour, vous êtes déjà authentifié</Alert.Heading>
                    <p>
                        Changez vos clé d'api vous déconnecteras !
                    </p>
                    <Button onClick={Logout}>Déconnexion</Button>
                </Alert>
            )}
            {!token && (
                <CredentialsForm
                    onSubmit={(values) => save(values.clientId, values.clientSecret)}
                    defaultValues={decodeCredentials}
                />)
            }
        </>
    );
}
