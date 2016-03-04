export default function sendEmailsFactory(transporter, defaultOptions = {}) {
    if (!transporter || typeof transporter.sendMail_ !== 'function') {
        throw new Error('Invalid transporter');
    }

    const defaultEmail = {attachments: [], ...defaultOptions};

    const wrapMail = email => {
        const cleanedEmail = {
            ...defaultEmail,
            ...email,
        };

        if (cleanedEmail.emitter) {
            if (!cleanedEmail.from) {
                cleanedEmail.from = `${cleanedEmail.emitter.name} <${cleanedEmail.emitter.address}>`;
            }
            delete cleanedEmail.emitter;
        }

        cleanedEmail.html = cleanedEmail.body;
        delete cleanedEmail.body;

        return transporter.sendMail_(cleanedEmail);
    };

    /**
     * @param {array} emails - List a emails with attrs `from`, `to`, `subject`, `body`, `attachments`
     *                         Only `to`, `subject` and `body` are required if default options specify others
     */
    return function* sendEmails(emails) {
        const emailsToSend = (Array.isArray(emails)) ? emails : [emails];

        return yield emailsToSend.map(wrapMail);
    };
}
