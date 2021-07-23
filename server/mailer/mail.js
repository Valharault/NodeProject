const mailer = require('nodemailer');
const {Valid} = require('../mailer/valid_template');
const {Registration} = require('../mailer/register_template');


const getEmailData = (to, dataFields, template) => {
    let data = null;

    switch (template) {
        case "Registration" :
            data = {
                from: "martinpetit1998@gmail.com",
                to,
                subject: `Inscription`,
                html: Registration(dataFields)
            }
            break;
        case "Validate" :
            data = {
                from: "martinpetit1998@gmail.com",
                to,
                subject: `Validation du compte`,
                html: Valid(dataFields)
            }
            break;
        default:
            data;
    }
    return data;

}

const sendEmail = (to, dataFields, type) => {
    const smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "martinpetit1998@gmail.com",
                pass: 'Martin92pmkygti8'
            },
            tls: {
                rejectUnauthorized: false
            }
        }
    )
    const mail = getEmailData(to, dataFields, type)
    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('email send !');
        }
    })
}

module.exports = {sendEmail};
