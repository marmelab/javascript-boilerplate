import { htmlToText } from 'nodemailer-html-to-text';
import smtpTransport from 'nodemailer-smtp-transport';
import nodemailer from 'nodemailer';

const transporterFactory = config => {
    let transporter;

    if (!config) throw Error('Configuration needed for transporter factory');

    if (config.service === 'smtp') {
        transporter = nodemailer.createTransport(smtpTransport(config.auth || {}));
    } else {
        const transport = require(`./transporters/${config.transport}`).default; // eslint-disable-line global-require
        transporter = nodemailer.createTransport(transport(config.transport_options));
    }

    transporter.use('compile', htmlToText());
    transporter.sendMailPromise = mails => new Promise((resolve, reject) => {
        transporter.sendMail(mails, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });

    return transporter;
};

export default transporterFactory;
