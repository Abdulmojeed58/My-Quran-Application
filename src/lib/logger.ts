import { Config } from '@/utils/constants';
import pino from 'pino';

const localTransport = pino.transport({
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

const productionTransport = pino.transport({
    target: '@logtail/pino',
    options: { sourceToken: Config.liveTailToken },
});

const transport = Config.appEnv === 'production' ? productionTransport : localTransport;

export const logger = pino({ name: 'app', level: 'trace' }, transport);
