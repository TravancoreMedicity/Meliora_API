const { createLogger, transports, format } = require('winston');

// ------- Log Format -----------

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level} : ${stack || message}`;
})

// ------- Logger Function --------

const productionLogger = createLogger({
    transports: [
        //----- logger for info -------
        new transports.File({
            filename: './errorlog/info.log',
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY h:m:ss' }),
                format.simple(),
                format.errors({ stack: true }),
                logFormat)
        }),
        // ----- logger for Error ---------
        new transports.File({
            filename: './errorlog/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY h:m:ss' }),
                format.simple(),
                format.errors({ stack: true }),
                logFormat)
        }),
        // ----- logger for Warning ---------
        new transports.File({
            filename: './errorlog/warn.log',
            level: 'warn',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY h:m:ss' }),
                format.simple(),
                format.errors({ stack: true }),
                logFormat)
        }),
    ]
})

const logwindow = (message) => {
    productionLogger.log('error', message, { meta1: 'meta1' })
}
const infologwindow = (message) => {
    productionLogger.log('info', message, { meta1: 'meta1' })
}
const warnlogwindow = (message) => {
    productionLogger.log('warn', message, { meta1: 'meta1' })
}


module.exports = {
    productionLogger,
    logwindow,
    infologwindow,
    warnlogwindow
}