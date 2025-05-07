import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    auth?: {
      tenant?: string;
    };
  }
}
