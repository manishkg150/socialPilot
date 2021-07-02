const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    level: 'info',
    exitOnError: false, // do not exit on handled exceptions
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
        // format.json()
        format.printf(info => {
            return `${new Date(info.timestamp).toString()} ${info.level}: ${info.message}`;
        })
    ),
    defaultMeta: { service: 'SOCIAL PILOT LOGS' },
    transports: [
      // - Write all logs to `/home/ec2-user/app.log`
      new transports.File({ filename: '/var/log/app.log', maxsize: 10000000000 })
    ]
});

module.exports = logger;