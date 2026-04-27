/**
 * Backend API integration tests.
 *
 * These tests exercise the real PHP endpoints over HTTP. They are opt-in so
 * local frontend-focused runs still work on machines without PHP/MySQL.
 */

const { spawn, spawnSync } = require('child_process');
const path = require('path');

const shouldRunIntegration = process.env.RUN_API_INTEGRATION === '1';
const describeIntegration = shouldRunIntegration ? describe : describe.skip;

const host = '127.0.0.1';
const port = Number(process.env.API_TEST_PORT || 8000);
const baseUrl = `http://${host}:${port}/api`;
const repoRoot = path.resolve(__dirname, '..');

let phpServer;

async function waitForServer(url, attempts = 40, delayMs = 250) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: 'healthcheck', password: 'healthcheck' }),
      });

      if (response.ok) {
        return;
      }
    } catch {
      // The server may still be booting.
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error(`PHP server did not become ready at ${url}`);
}

async function postJson(endpoint, payload) {
  const response = await fetch(`${baseUrl}/${endpoint}.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  return {
    status: response.status,
    body: JSON.parse(text),
  };
}

describeIntegration('PHP API integration', () => {
  beforeAll(async () => {
    const phpCheck = spawnSync('php', ['-v'], {
      cwd: repoRoot,
      encoding: 'utf8',
    });

    if (phpCheck.status !== 0) {
      throw new Error(
        'RUN_API_INTEGRATION=1 was set, but PHP is not available on PATH.'
      );
    }

    phpServer = spawn('php', ['-S', `${host}:${port}`, '-t', repoRoot], {
      cwd: repoRoot,
      stdio: 'ignore',
    });

    await waitForServer(`${baseUrl}/Login.php`);
  });

  afterAll(() => {
    if (phpServer) {
      phpServer.kill();
    }
  });

  test('logs in with seeded credentials', async () => {
    const response = await postJson('Login', {
      login: 'integration-user',
      password: 'testpass123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstName: 'Integration',
      lastName: 'User',
      error: '',
    });
  });

  test('rejects invalid credentials', async () => {
    const response = await postJson('Login', {
      login: 'integration-user',
      password: 'wrong-password',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 0,
      firstName: '',
      lastName: '',
      error: 'No Records Found',
    });
  });

  test('adds a color and returns it from search', async () => {
    const colorName = `Integration Violet ${Date.now()}`;

    const addResponse = await postJson('AddColor', {
      color: colorName,
      userId: 1,
    });

    expect(addResponse.status).toBe(200);
    expect(addResponse.body).toEqual({ error: '' });

    const searchResponse = await postJson('SearchColors', {
      search: 'Integration Violet',
      userId: 1,
    });

    expect(searchResponse.status).toBe(200);
    expect(searchResponse.body.error).toBe('');
    expect(searchResponse.body.results).toContain(colorName);
  });

  test('returns an error when no colors match the search', async () => {
    const response = await postJson('SearchColors', {
      search: 'color-that-does-not-exist',
      userId: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 0,
      firstName: '',
      lastName: '',
      error: 'No Records Found',
    });
  });
});
