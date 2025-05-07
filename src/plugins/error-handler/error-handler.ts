import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { DisplayableError } from '../../utils/errors.js';

export const errorHandlerPlugin: FastifyPluginAsyncTypebox = async (api) => {
  api.setErrorHandler((error, request, reply) => {
    if (error instanceof DisplayableError) {
      reply.status(error.statusCode).send({
        status: error.status,
        message: error.message,
        statusCode: error.statusCode,
      });
      request.log.error(error.inner);
      return;
    }

    if (error?.validation) {
      reply.status(400).send({
        message: error.validation[0].message,
        details: error.validation,
        status: 'error',
        statusCode: 400,
      });
      request.log.warn(error);
      return;
    }

    request.log.error(error);
    reply.status(500).send({
      message: 'Internal Server Error',
      status: 'error',
      statusCode: error.statusCode || 500,
    });
  });
};
