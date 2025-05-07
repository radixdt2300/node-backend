import type { FastifyPluginAsync } from 'fastify';
import jwt from 'jsonwebtoken';

export const jwtAuthPlugin: FastifyPluginAsync = async (instance) => {
  instance.addHook('onRequest', async (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return;
    }
    const [authType, token] = authHeader.split(' ');
    if (authType !== 'Bearer') {
      throw instance.httpErrors.unauthorized('Invalid auth type');
    }
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== 'object') {
      throw instance.httpErrors.unauthorized('Invalid token');
    }
    request.auth = {
      tenant: decoded.tenant, // TODO: <-- Property 'tenant' does not exist on type 'object'.
    };
  });

  instance.addHook('onSend', async (request, reply) => {
    reply.header('x-tenant', request.auth?.tenant);
  });
};
