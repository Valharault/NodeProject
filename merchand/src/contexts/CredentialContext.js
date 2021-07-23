import {createContext, useMemo, useState} from "react";

export const CredentialContext = createContext();

export default function CredentialProvider({children}) {
    const [credential, setCredential] = useState(
        JSON.parse(localStorage.getItem("credential") || "null")
    );

    const save = (clientId, clientSecret) => {
        fetch("http://localhost:4000/api/merchand-credential", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({clientId, clientSecret}),
        })
            .then((res) => res.json())
            .then((data) => {
                    if (data.successfull) {
                        localStorage.setItem(
                            "credential",
                            JSON.stringify({
                                clientId,
                                clientSecret,
                            })
                        )
                        setCredential({
                            clientId,
                            clientSecret,
                        })
                    }
                }
            );
    };

    const token = useMemo(
        () =>
            credential && btoa(`${credential.clientId}:${credential.clientSecret}`),
        [credential]
    );

    return (
        <CredentialContext.Provider
            value={{decodedCredential: credential, token, save}}
        >
            {children}
        </CredentialContext.Provider>
    );
}
