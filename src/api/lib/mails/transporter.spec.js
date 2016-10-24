import { assert } from 'chai';
import transporterFactory from './transporter';

describe('Mails Transporter', () => {
    let config;

    beforeEach(() => {
        config = {
            transport: 'console',
            transport_options: 'transport options',
        };
    });

    it('should throws error with bad arguments', () => {
        assert.throws(transporterFactory, 'Configuration needed for transporter factory');
    });

    it('should return a console transporter by default', () => {
        assert.deepEqual(transporterFactory(config).transporter.name, 'console');
    });

    it('should return a smtp transporter if needed', () => {
        config.service = 'smtp';
        assert.deepEqual(transporterFactory(config).transporter.name, 'SMTP');
    });
});
