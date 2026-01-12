import { BrowseTheWeb } from '../ui/BrowseTheWeb';
import type { Actor } from '../actors/Actor';

export const AddFirstProductToCart = () => async (actor: Actor): Promise<void> => {
  const { page } = actor.abilityTo(BrowseTheWeb);
  await page.locator('[data-test^="add-to-cart-"]').first().click();
};
