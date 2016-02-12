import winston from 'winston';

export default function logger(loggersConfig) {
    const transports = [];

    for (const key in loggersConfig) {
        if (!loggersConfig[key]) continue;
        transports.push(new (winston.transports[key])(loggersConfig[key]));
    }

    return new (winston.Logger)({
        transports: transports,
    });
}
