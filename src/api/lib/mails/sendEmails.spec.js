/* eslint func-names: off */
import expect from 'expect';
import sendEmailsFactory from './sendEmails';

describe('Mails sendEmails', () => {
    let transporter;
    let defaultOptions;

    beforeEach(() => {
        transporter = {
            sendMailPromise(input) { return Promise.resolve(input); },
        };
        defaultOptions = {
            emitter: { name: 'marmelab', address: 'info@marmelab.com' },
        };
    });

    it('should throw an error if no transporter', () => {
        expect(sendEmailsFactory).toThrow('Invalid transporter');
    });

    it('should send correct emails', async () => {
        const sendEmails = sendEmailsFactory(transporter, defaultOptions);
        const emails = await sendEmails([{
            subject: 'Mail 1',
            to: 'user@marmelab.com',
            body: 'Mail 1 Body',
        }, {
            from: 'Another <another@marmelab.com>',
            subject: 'Mail 2',
            to: 'user2@marmelab.com',
            body: 'Mail 2 Body',
            attachments: ['attachment'],
        }]);

        expect(emails).toEqual([{
            from: 'marmelab <info@marmelab.com>',
            to: 'user@marmelab.com',
            subject: 'Mail 1',
            html: 'Mail 1 Body',
            attachments: [],
        }, {
            from: 'Another <another@marmelab.com>',
            to: 'user2@marmelab.com',
            subject: 'Mail 2',
            html: 'Mail 2 Body',
            attachments: ['attachment'],
        }]);
    });
});
