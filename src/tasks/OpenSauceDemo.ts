import { BrowseTheWeb } from '../ui/BrowseTheWeb';
import type { Actor } from '../actors/Actor';

export const OpenSauceDemo = (url: string) => async (actor: Actor): Promise<void> => {
  const { page } = actor.abilityTo(BrowseTheWeb);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
};
