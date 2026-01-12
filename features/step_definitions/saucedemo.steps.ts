import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect, Browser, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

import { Actor } from '../../src/actors/Actor';
import { BrowseTheWeb } from '../../src/ui/BrowseTheWeb';
import { OpenSauceDemo } from '../../src/tasks/OpenSauceDemo';
import { LoginSauceDemo } from '../../src/tasks/LoginSauceDemo';
import { AddFirstProductToCart } from '../../src/tasks/AddFirstProductToCart';
import { CheckoutWithInfo } from '../../src/tasks/CheckoutWithInfo';
import { OrderCompleteIsVisible } from '../../src/questions/OrderCompleteIsVisible';

dotenv.config();

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let actor: Actor;

const SAUCE_URL = process.env.SAUCE_URL || 'https://www.saucedemo.com/';
const SAUCE_USER = process.env.SAUCE_USER || 'standard_user';
const SAUCE_PASS = process.env.SAUCE_PASS || 'secret_sauce';

Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  actor = new Actor('QA');
  actor.can(new BrowseTheWeb(page));
});

After(async () => {
  await browser?.close();
});

Given('I open SauceDemo', async () => {
  await actor.attemptsTo(OpenSauceDemo(SAUCE_URL));
});

When('I login with valid credentials', async () => {
  await actor.attemptsTo(LoginSauceDemo(SAUCE_USER, SAUCE_PASS));
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
});

When('I add the first product to the cart', async () => {
  await actor.attemptsTo(AddFirstProductToCart());
});

When(
  'I checkout with first name {string} last name {string} postal code {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    await actor.attemptsTo(CheckoutWithInfo(firstName, lastName, postalCode));
  }
);

Then('I should see the order complete page', async () => {
  await expect(await actor.asks(OrderCompleteIsVisible())).toBeTruthy();
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
