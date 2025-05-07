import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';

import { createApp } from '../../app.js';

describe('JWT plugin', () => {
  it('should validate auth type', async () => {
    const app = await createApp();

    const url = new URL('/health', 'http://localhost:3000');
    const response = await app.inject({
      method: 'GET',
      headers: {
        authorization: '123',
      },
      url: url.pathname + url.search,
    });

    expect(response.statusCode).toBe(401);

    const content = response.json();
    expect(content).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Invalid auth type',
    });
  });

  it('should validate JWT', async () => {
    const app = await createApp();

    const url = new URL('/health', 'http://localhost:3000');
    const response = await app.inject({
      method: 'GET',
      headers: {
        authorization: 'Bearer 123',
      },
      url: url.pathname + url.search,
    });

    expect(response.statusCode).toBe(401);

    const content = response.json();
    expect(content).toEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Invalid token',
    });
  });

  it('should set x-tenant header', async () => {
    const app = await createApp();
    const token = jwt.sign({ tenant: 'test' }, 'secret');

    const url = new URL('/health', 'http://localhost:3000');
    const response = await app.inject({
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: url.pathname + url.search,
    });

    expect(response.statusCode).toBe(200);

    expect(response.headers['x-tenant']).toBe('test');
  });
});
