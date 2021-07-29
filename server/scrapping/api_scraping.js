const fetch = require('node-fetch');
const fs = require('fs');

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
    const dataFetch = await reponse.json();

    const euroDateData = {
        date: new Date(date),
        currency: {
            USD: dataFetch.eur.usd,
            aed: dataFetch.eur.eu,
            afn: dataFetch.eur.afn,
            all: dataFetch.eur.all,
            amd: dataFetch.eur.amd,
            ang: dataFetch.eur.ang,
            aoa: dataFetch.eur.aoa,
            ars: dataFetch.eur.ars,
            aud: dataFetch.eur.aud,
            awg: dataFetch.eur.awg,
            azn: dataFetch.eur.azn,
            bam: dataFetch.eur.bam,
            bbd: dataFetch.eur.bbd,
            bch: dataFetch.eur.bch,
            bdt: dataFetch.eur.bdt,
            bgn: dataFetch.eur.bgn,
            bhd: dataFetch.eur.bhd,
            bif: dataFetch.eur.bif,
            bmd: dataFetch.eur.bmd,
            bnd: dataFetch.eur.bnd,
            bob: dataFetch.eur.bob,
            brl: dataFetch.eur.brl,
            bsd: dataFetch.eur.bsd,
            btc: dataFetch.eur.btc,
            btn: dataFetch.eur.btn,
            bwp: dataFetch.eur.bwp,
            byn: dataFetch.eur.byn,
            bzd: dataFetch.eur.bzd,
            cad: dataFetch.eur.cad,
            cdf: dataFetch.eur.cdf,
            chf: dataFetch.eur.chf,
            clf: dataFetch.eur.clf,
            clp: dataFetch.eur.clp,
            cnh: dataFetch.eur.cnh,
            cny: dataFetch.eur.cny,
            cop: dataFetch.eur.cop,
            crc: dataFetch.eur.crc,
            cup: dataFetch.eur.cup,
            cve: dataFetch.eur.cve,
            czk: dataFetch.eur.czk,
            djf: dataFetch.eur.djf,
            dkk: dataFetch.eur.dkk,
            dop: dataFetch.eur.dop,
            dzd: dataFetch.eur.dzd,
            ecs: dataFetch.eur.ecs,
            eek: dataFetch.eur.eek,
            egp: dataFetch.eur.egp,
            ern: dataFetch.eur.ern,
            etb: dataFetch.eur.etb,
            eth: dataFetch.eur.eth,
            fjd: dataFetch.eur.fjd,
            gbp: dataFetch.eur.gbp,
            gel: dataFetch.eur.gel,
            ghs: dataFetch.eur.ghs,
            gip: dataFetch.eur.gip,
            gmd: dataFetch.eur.gmd,
            gnf: dataFetch.eur.gnf,
            gqe: dataFetch.eur.gqe,
            gtq: dataFetch.eur.gtq,
            gyd: dataFetch.eur.gyd,
            hkd: dataFetch.eur.hkd,
            hnl: dataFetch.eur.hnl,
            hrk: dataFetch.eur.hrk,
            htg: dataFetch.eur.htg,
            huf: dataFetch.eur.huf,
            idr: dataFetch.eur.idr,
            ils: dataFetch.eur.ils,
            inr: dataFetch.eur.inr,
            iqd: dataFetch.eur.iqd,
            irr: dataFetch.eur.irr,
            isk: dataFetch.eur.isk,
            jmd: dataFetch.eur.jmd,
            jod: dataFetch.eur.jod,
            jpy: dataFetch.eur.jpy,
            kes: dataFetch.eur.kes,
            kgs: dataFetch.eur.kgs,
            khr: dataFetch.eur.khr,
            kmf: dataFetch.eur.kmf,
            kpw: dataFetch.eur.kpw,
            krw: dataFetch.eur.krw,
            kwd: dataFetch.eur.kwd,
            kyd: dataFetch.eur.kyd,
            kzt: dataFetch.eur.kzt,
            lak: dataFetch.eur.lak,
            lbp: dataFetch.eur.lbp,
            lkr: dataFetch.eur.lkr,
            lrd: dataFetch.eur.lrd,
            lsl: dataFetch.eur.lsl,
            ltc: dataFetch.eur.ltc,
            lyd: dataFetch.eur.lyd,
            mad: dataFetch.eur.mad,
            mdl: dataFetch.eur.mdl,
            mga: dataFetch.eur.mga,
            mkd: dataFetch.eur.mkd,
            mmk: dataFetch.eur.mmk,
            mnt: dataFetch.eur.mnt,
            mop: dataFetch.eur.mop,
            mru: dataFetch.eur.mru,
            mur: dataFetch.eur.mur,
            mvr: dataFetch.eur.mvr,
            mwk: dataFetch.eur.mwk,
            mxn: dataFetch.eur.mxn,
            myr: dataFetch.eur.myr,
            mzm: dataFetch.eur.mzm,
            mzn: dataFetch.eur.mzn,
            nad: dataFetch.eur.nad,
            ngn: dataFetch.eur.ngn,
            nio: dataFetch.eur.nio,
            nok: dataFetch.eur.nok,
            npr: dataFetch.eur.npr,
            nzd: dataFetch.eur.nzd,
            omr: dataFetch.eur.omr,
            pab: dataFetch.eur.pab,
            pen: dataFetch.eur.pen,
            pgk: dataFetch.eur.pgk,
            php: dataFetch.eur.php,
            pkr: dataFetch.eur.pkr,
            pln: dataFetch.eur.pln,
            pyg: dataFetch.eur.pyg,
            qar: dataFetch.eur.qar,
            ron: dataFetch.eur.ron,
            rsd: dataFetch.eur.rsd,
            rub: dataFetch.eur.rub,
            rwf: dataFetch.eur.rwf,
            sar: dataFetch.eur.sar,
            sbd: dataFetch.eur.sbd,
            scr: dataFetch.eur.scr,
            sdg: dataFetch.eur.sdg,
            sek: dataFetch.eur.sek,
            sgd: dataFetch.eur.sgd,
            shp: dataFetch.eur.shp,
            sll: dataFetch.eur.sll,
            sos: dataFetch.eur.sos,
            srd: dataFetch.eur.srd,
            ssp: dataFetch.eur.ssp,
            std: dataFetch.eur.std,
            stn: dataFetch.eur.stn,
            svc: dataFetch.eur.svc,
            syp: dataFetch.eur.syp,
            szl: dataFetch.eur.szl,
            thb: dataFetch.eur.thb,
            tjs: dataFetch.eur.tjs,
            tmt: dataFetch.eur.tmt,
            tnd: dataFetch.eur.tnd,
            top: dataFetch.eur.top,
            try: dataFetch.eur.try,
            ttd: dataFetch.eur.ttd,
            twd: dataFetch.eur.twd,
            tzs: dataFetch.eur.tzs,
            uah: dataFetch.eur.uah,
            ugx: dataFetch.eur.ugx,
            usd: dataFetch.eur.usd,
            uyu: dataFetch.eur.uyu,
            uzs: dataFetch.eur.uzs,
            vef: dataFetch.eur.vef,
            ves: dataFetch.eur.ves,
            vnd: dataFetch.eur.vnd,
            vuv: dataFetch.eur.vuv,
            wst: dataFetch.eur.wst,
            xaf: dataFetch.eur.xaf,
            xag: dataFetch.eur.xag,
            xcd: dataFetch.eur.xcd,
            xof: dataFetch.eur.xof,
            xpd: dataFetch.eur.xpd,
            xpf: dataFetch.eur.xpf,
            xpt: dataFetch.eur.xpt,
            yer: dataFetch.eur.yer,
            zar: dataFetch.eur.zar,
            zmw: dataFetch.eur.zmw,
        },
    };
    euroArray.push(euroDateData);
    const euroArrayObjet = JSON.stringify(euroArray);
    fs.writeFile('./euroConvertData.json', euroArrayObjet, (err) => {
        if (err) {
            return console.log(err);
        }
    });
    return console.log(`data save for ${date}`);
}

async function main() {
    try {
        const today = new Date();
        let date = new Date('2021-07-28');
        while (date <= today) {
            const dateformat = formatDate(date);
            await getData(dateformat);
            const nextDate = date.addDays(1);
            date = nextDate;
        }
    } catch (error) {
        console.error(` ${error.message}`);
    }
}

main().catch(console.error);
