import { BrowseTheWeb } from '../ui/BrowseTheWeb';
import type { Actor } from '../actors/Actor';

export const CheckoutWithInfo = (firstName: string, lastName: string, postalCode: string) => async (
  actor: Actor
): Promise<void> => {
  const { page } = actor.abilityTo(BrowseTheWeb);

  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);

  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
};
