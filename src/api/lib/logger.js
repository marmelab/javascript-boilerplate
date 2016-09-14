import winston from 'winston';

export default function logger(loggersConfig) {
    const transports = [];

    for (const key in loggersConfig) { // eslint-disable-line no-restricted-syntax
        if (loggersConfig[key]) {
            transports.push(new (winston.transports[key])(loggersConfig[key]));
        }
    }

    return new (winston.Logger)({
        transports,
    });
}
