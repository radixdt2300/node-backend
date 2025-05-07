import './datadog/tracer.js'; // This must be initialized first.
import { createApp } from './app.js';

const start = async (port: number) => {
  const app = await createApp({
    logger: {
      // DataDog expects levels as strings instead of numbers
      formatters: {
        level(label) {
          return { level: label };
        },
      },
    },
  });

  // To allow incoming connections to reach Fastify
  // inside the container, we need to bind to an IP
  // address that is accessible from outside the
  // container. Binding to 0.0.0.0 is a way to bind
  // to all available network interfaces on the
  // container.
  await app.listen({ port, host: '0.0.0.0' });
  // eslint-disable-next-line no-console
  console.log(`Server listening at ${port}`);
};

start(8080).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
