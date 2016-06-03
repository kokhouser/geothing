var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            name: 'console-info',
            level: 'info',
            //filename: './logs/all-logs.log',
            //handleExceptions: true,
            json: false,
            //maxsize: 5242880, //5MB
            //maxFiles: 5,
            colorize: true
        }),
        /*
        new winston.transports.Console({
            name: 'console-debug',
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
        */
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(formatted + ": " + message);
    }
};