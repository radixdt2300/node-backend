// import 'dotenv/config';
import { createApp } from './app.js';

const start = async (port: number) => {
  const app = await createApp({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });
  try {
    await app.listen({ port });
    // eslint-disable-next-line no-console
    console.log(`Server listening at ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(8080);
