import winston from 'winston';

export default function logger(loggersConfig) {
    const transports = Object
        .keys(loggersConfig)
        .filter(key => loggersConfig[key])
        .map(key => new (winston.transports[key])(loggersConfig[key]));

    return new (winston.Logger)({
        transports,
    });
}
