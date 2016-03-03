import { assert } from 'chai';
import sendEmailsFactory from './sendEmails';

describe('Mails sendEmails', () => {
    let transporter;
    let defaultOptions;

    beforeEach(() => {
        transporter = {
            *sendMail_(input) { return input; },
        };
        defaultOptions = {
            emitter: { name: 'marmelab', address: 'info@marmelab.com' },
        };
    });

    it('should throw an error if no transporter', () => {
        assert.throws(sendEmailsFactory, 'Invalid transporter');
    });

    it('should send correct emails', function* () {
        const sendEmails = sendEmailsFactory(transporter, defaultOptions);
        const emails = yield sendEmails([{
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

        assert.deepEqual(emails, [{
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
