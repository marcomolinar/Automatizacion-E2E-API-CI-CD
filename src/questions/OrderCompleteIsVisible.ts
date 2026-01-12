import { BrowseTheWeb } from '../ui/BrowseTheWeb';
import type { Actor } from '../actors/Actor';

export const OrderCompleteIsVisible = () => async (actor: Actor): Promise<boolean> => {
  const { page } = actor.abilityTo(BrowseTheWeb);
  return await page.locator('[data-test="complete-header"]').isVisible();
};
