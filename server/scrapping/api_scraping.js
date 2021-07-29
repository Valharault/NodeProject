const fetch = require('node-fetch');
const fs = require('fs');
// import axios from "axios";

const euroArray = [];

function formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [year, month, day].join('-');
}
// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function addDays(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
async function getData(date) {
    const reponse = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/eur.min.json`,
    );
    if (reponse.status >= 300) throw new Error('Something went wrong');
    // save the data in an array
    const dataFetch = await reponse.json();

    const euroDateData = {
        date: new Date(date),
        currency: {
            USD: dataFetch.eur.usd,
        },
    };
    euroArray.push(euroDateData);
    const euroArrayObjet = JSON.stringify(euroArray);
    // console.log('array', euroArray);
    fs.writeFile('./euroConvertData.json', euroArrayObjet, (err) => {
        if (err) {
            return console.log(err);
        }
        // axios.post("http://localhost:4000/currency", { values }).then(response => {
        //     return response.data;
        // });
        console.log('The file was saved!');
    });
    return console.log(`data save for ${date}`);
}

async function main() {
    try {
        const today = new Date();
        let date = new Date('2020-11-22');
        while (date <= today) {
            const dateformat = formatDate(date);
            // eslint-disable-next-line no-await-in-loop
            await getData(dateformat);
            const nextDate = date.addDays(1);
            date = nextDate;
        }
    } catch (error) {
        console.error(` ${error.message}`);
    }
}
main().catch(console.error);