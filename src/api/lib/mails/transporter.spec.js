import expect from 'expect';
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
        expect(transporterFactory).toThrow('Configuration needed for transporter factory');
    });

    it('should return a console transporter by default', () => {
        expect(transporterFactory(config).transporter.name).toEqual('console');
    });

    it('should return a smtp transporter if needed', () => {
        config.service = 'smtp';
        expect(transporterFactory(config).transporter.name).toEqual('SMTP');
    });
});
