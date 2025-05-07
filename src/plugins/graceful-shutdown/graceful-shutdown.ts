import { FastifyInstance } from 'fastify';

type GracefulShutdownOptions = {
  timeoutMsec: number;
};

export const gracefulShutdownPlugin = async (
  fastify: FastifyInstance,
  opts: GracefulShutdownOptions
) => {
  let isShuttingDown = false;

  const gracefulShutdown = async (signal: NodeJS.Signals) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    fastify.log.info(`${signal} received. Gracefully shutting down.`);

    const timeout = setTimeout(() => {
      fastify.log.warn(`Forcefully shutting down after ${opts.timeoutMsec} milliseconds.`);
      process.exit(1);
    }, opts.timeoutMsec);

    timeout.unref();

    try {
      await fastify.close();
      fastify.log.info('Closed out remaining connections.');
      clearTimeout(timeout);
      process.exit(0);
    } catch (err) {
      fastify.log.error('Error during graceful shutdown', err);
      process.exit(1);
    }
  };

  // the shutdown is async but we can't pass async functions to process.on
  // so we wrap them
  process.on('SIGTERM', (signal) => {
    gracefulShutdown(signal).catch((err) => {
      fastify.log.error('Error during graceful shutdown', err);
      process.exit(1);
    });
  });
  process.on('SIGINT', (signal) => {
    gracefulShutdown(signal).catch((err) => {
      fastify.log.error('Error during graceful shutdown', err);
      process.exit(1);
    });
  });
};
