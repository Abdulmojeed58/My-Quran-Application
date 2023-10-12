import pino from 'pino';

const transport = pino.transport({
    targets: [
        {
            level: 'trace',
            target: 'pino/file',
            options: {
                destination: 'logs/app.log',
            },
        },
        {
            level: 'trace',
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'UTC:yyyy-mm-dd HH:MM:ss',
            },
        },
    ],
});

export const logger = pino({ name: 'app', level: 'trace' }, transport);
