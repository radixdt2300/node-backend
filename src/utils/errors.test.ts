import { describe, it, expect } from 'vitest';
import { createApp } from '../app.js';

import { DisplayableError } from './errors.js';

describe('Error handling', () => {
  it('should have default error handling', async () => {
    const app = await createApp({
      setup: (app) => {
        app.get('/error', async () => {
          throw new Error('Test error');
        });
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/error',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      statusCode: 500,
      message: 'Internal Server Error',
      status: 'error',
    });
  });

  it('should have error handling for custom errors', async () => {
    const app = await createApp({
      setup: (app) => {
        app.get('/error', async () => {
          throw new DisplayableError('I am an error', new Error('Test error'), {
            status: 'Custom status',
            statusCode: 510,
          });
        });
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/error',
    });

    expect(response.statusCode).toBe(510);
    expect(response.json()).toEqual({
      statusCode: 510,
      message: 'I am an error',
      status: 'Custom status',
    });
  });
});
