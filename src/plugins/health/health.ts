import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

export const healthPlugin: FastifyPluginAsyncTypebox = async (api) => {
  api.get(
    '/health',
    {
      schema: {
        response: {
          200: Type.Object({
            healthy: Type.Boolean({
              description: '"true" if the service is healthy',
            }),
          }),
        },
      },
    },
    async () => ({ healthy: true })
  );
};
