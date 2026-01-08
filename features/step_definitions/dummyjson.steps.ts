import { Before, After, When, Then } from '@cucumber/cucumber';
import { request, expect, APIRequestContext, APIResponse } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.DUMMYJSON_URL || 'https://dummyjson.com';

let api: APIRequestContext;
let lastResponse: APIResponse;
let lastJson: any;
let token: string | undefined;

Before({ tags: '@api' }, async () => {
  api = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
});

After({ tags: '@api' }, async () => {
  await api?.dispose();
  token = undefined;
  lastJson = undefined;
});

async function setLastResponse(res: APIResponse) {
  lastResponse = res;
  try {
    lastJson = await res.json();
  } catch {
    lastJson = undefined;
  }
}

When(
  'I login to DummyJSON with username {string} and password {string}',
  async (username: string, password: string) => {
    // ✅ Endpoint correcto según docs: /auth/login
    const res = await api.post('/auth/login', {
      data: {
        username,
        password,
        expiresInMins: 30, // opcional
      },
    });

    await setLastResponse(res);

    // DummyJSON suele regresar accessToken (y refreshToken). Dejamos compat por si existiera token.
    token = lastJson?.accessToken ?? lastJson?.token;
  }
);

When('I request the users list', async () => {
  const res = await api.get('/users');
  await setLastResponse(res);
});

When('I request the current user profile with the token', async () => {
  if (!token) throw new Error('No token stored. Run login step first.');

  // ✅ Endpoint correcto según docs: /auth/me
  const res = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  await setLastResponse(res);
});

Then('the response status should be {int}', async (status: number) => {
  expect(lastResponse, 'No response stored yet').toBeTruthy();
  expect(lastResponse.status()).toBe(status);
});

Then('the response should contain a token', async () => {
  expect(lastJson, 'Response is not JSON or is empty').toBeTruthy();

  const t: unknown = lastJson?.accessToken ?? lastJson?.token;

  expect(t, 'accessToken/token field not found in response').toBeTruthy();
  expect(typeof t).toBe('string');
  expect((t as string).length).toBeGreaterThan(10);
});

Then('the response should have a users array', async () => {
  expect(lastJson, 'Response is not JSON or is empty').toBeTruthy();
  expect(Array.isArray(lastJson.users)).toBeTruthy();
});

Then('the response should have the field {string}', async (field: string) => {
  expect(lastJson, 'Response is not JSON or is empty').toBeTruthy();
  expect(Object.prototype.hasOwnProperty.call(lastJson, field), `Field "${field}" not found in response`).toBeTruthy();
});
