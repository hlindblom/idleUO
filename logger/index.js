import winston from 'winston';

const logReport = (err) => {
    console.error(err.stack);
    logger.info(err.stack)
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        // new winston.transports.File({filename: './logger/error.log', level: 'error'}),
        // new winston.transports.File({filename: './logger/combined.log'}),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }))
}

export {logger, logReport}