import { describe, it, expect } from 'vitest';
import { createApp } from '../../app.js';

describe('Health endpoint', () => {
  it('respond ok to health call', async () => {
    const app = await createApp();

    const response = await app.inject({
      method: 'GET',
      url: `/health`,
    });

    expect(response.statusCode).toBe(200);

    const content = response.json<{ healthy: boolean }>();
    expect(content.healthy).toBe(true);
  });
});
