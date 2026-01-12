import { BrowseTheWeb } from '../ui/BrowseTheWeb';
import type { Actor } from '../actors/Actor';
import { expect } from '@playwright/test';

export const LoginSauceDemo = (username: string, password: string) => async (actor: Actor): Promise<void> => {
  const { page } = actor.abilityTo(BrowseTheWeb);

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  // Para el happy path, SauceDemo redirige a inventory.html
  await expect(page).toHaveURL(/inventory\.html/);
};
