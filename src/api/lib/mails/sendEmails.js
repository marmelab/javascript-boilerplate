export default function sendEmailsFactory(transporter, defaultOptions = {}) {
    if (!transporter || typeof transporter.sendMailPromise !== 'function') {
        throw new Error('Invalid transporter');
    }

    const defaultEmail = Object.assign({ attachments: [] }, defaultOptions);

    const wrapMail = async (email) => {
        const cleanedEmail = Object.assign({}, defaultEmail, email);

        if (cleanedEmail.emitter) {
            if (!cleanedEmail.from) {
                cleanedEmail.from = `${cleanedEmail.emitter.name} <${cleanedEmail.emitter.address}>`;
            }
            delete cleanedEmail.emitter;
        }

        cleanedEmail.html = cleanedEmail.body;
        delete cleanedEmail.body;

        return transporter.sendMailPromise(cleanedEmail);
    };

    /**
     * @param {array} emails - List a emails with attrs `from`, `to`, `subject`, `body`, `attachments`
     *                         Only `to`, `subject` and `body` are required if default options specify others
     */
    return async (emails) => {
        const emailsToSend = (Array.isArray(emails)) ? emails : [emails];

        return Promise.all(emailsToSend.map(wrapMail));
    };
}
