/**
 * Tracer must be initialized before any other module.
 * ref: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs/?tab=containers
 */
import tracer from 'dd-trace';

// initialized in a different file to avoid hoisting.
tracer.init({ logInjection: true });
tracer.use('fastify');
tracer.use('aws-sdk');

export default tracer;
