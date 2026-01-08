import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect, Browser, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

setDefaultTimeout(30 * 1000);

let browser: Browser;
let page: Page;

const SAUCE_URL = process.env.SAUCE_URL || 'https://www.saucedemo.com/';
const SAUCE_USER = process.env.SAUCE_USER || 'standard_user';
const SAUCE_PASS = process.env.SAUCE_PASS || 'secret_sauce';

Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser?.close();
});

Given('I open SauceDemo', async () => {
  await page.goto(SAUCE_URL, { waitUntil: 'domcontentloaded' });
});

When('I login with valid credentials', async () => {
  await page.locator('[data-test="username"]').fill(SAUCE_USER);
  await page.locator('[data-test="password"]').fill(SAUCE_PASS);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
});

When('I add the first product to the cart', async () => {
  // Primer botón "Add to cart" en la lista
  await page.locator('[data-test^="add-to-cart-"]').first().click();
});

When(
  'I checkout with first name {string} last name {string} postal code {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill(firstName);
    await page.locator('[data-test="lastName"]').fill(lastName);
    await page.locator('[data-test="postalCode"]').fill(postalCode);
    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();
  }
);

Then('I should see the order complete page', async () => {
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});

Then('I should see a login error containing {string}', async (text: string) => {
  const err = page.locator('[data-test="error"]');
  await expect(err).toBeVisible();
  await expect(err).toContainText(text);
});

When('I sort products by {string}', async (option: string) => {
  await page.locator('[data-test="product-sort-container"]').selectOption({ label: option });
});

When('I add product {string} to the cart', async (productName: string) => {
  // Busca el item por nombre y hace click en su botón "Add to cart"
  const item = page.locator('.inventory_item').filter({ has: page.getByText(productName, { exact: true }) });
  await item.locator('button[data-test^="add-to-cart-"]').click();
});

Then('the cart badge should be {string}', async (count: string) => {
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(count);
});
