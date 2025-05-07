import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifySensible from '@fastify/sensible';
import { routesPlugin } from './routes/routes.js';
import { swaggerOnReady, swaggerPlugin } from './plugins/swagger/swagger.js';
import { jwtAuthPlugin } from './plugins/jwt-auth/jwt-auth.js';
import { healthPlugin } from './plugins/health/health.js';
import { gracefulShutdownPlugin } from './plugins/graceful-shutdown/graceful-shutdown.js';
import { APP_PREFIX, ENVIRONMENT } from './config.js';
import { errorHandlerPlugin } from './plugins/error-handler/error-handler.js';

type CreateAppOptions = FastifyServerOptions & {
  setup?: (app: FastifyInstance) => void;
};

export const createApp = async (opts: CreateAppOptions = { logger: false }) => {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();
  await app.register(fastifySensible, {
    logLevel: ['test'].includes(ENVIRONMENT) ? 'debug' : 'warn',
  });

  await app.register(healthPlugin);
  await errorHandlerPlugin(app, {});
  await swaggerPlugin(app, { routePrefix: `${APP_PREFIX}/docs` });

  await jwtAuthPlugin(app, {});

  await app.register(routesPlugin, { prefix: APP_PREFIX });
  if (opts.setup) {
    opts.setup(app);
  }

  await app.register(gracefulShutdownPlugin, { timeoutMsec: 30000 });

  await app.ready();

  swaggerOnReady(app);

  return app;
};
