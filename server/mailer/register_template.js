const Registration = data => {
    return `<div>
        Bonjour  ${data.firstname} ${data.lastname} <br>
        Votre compte est en cours de validation, nous vous recontacterons prochainement!
                </div>`
}

module.exports = {Registration}
