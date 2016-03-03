import { htmlToText } from 'nodemailer-html-to-text';
import smtpTransport from 'nodemailer-smtp-transport';
import nodemailer from 'nodemailer';
import thunkify from 'thunkify';

const transporterFactory = config => {
    let transporter;

    if (!config) throw Error('Configuration needed for transporter factory');

    switch (config.service) {
    case 'smtp':
        transporter = nodemailer.createTransport(smtpTransport(config.auth || {}));
        break;
    default:  // eslint-disable-line no-case-declarations
        const transportName = (config.transport) ? config.transport : 'console';
        const transport = require(`./transporters/${transportName}`);
        transporter = nodemailer.createTransport(transport(config.transport_options));
    }

    transporter.use('compile', htmlToText());
    transporter.sendMail_ = thunkify(transporter.sendMail);

    return transporter;
};

export default transporterFactory;
