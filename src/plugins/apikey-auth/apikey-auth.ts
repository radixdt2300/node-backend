import type { FastifyPluginAsync } from 'fastify';

export const apikeyAuthPlugin: FastifyPluginAsync = async (instance) => {
  instance.addHook('onRequest', async (request) => {
    const authHeader = request.headers['x-tenant'];
    if (!authHeader) {
      return;
    }
    const [tenant] = Array.isArray(authHeader) ? authHeader : [authHeader];
    if (!tenant) {
      throw instance.httpErrors.unauthorized('Invalid api key');
    }
    request.auth = {
      tenant,
    };
  });
  instance.addHook('onSend', async (request, reply) => {
    reply.header('x-tenant', request.auth?.tenant);
  });
};
