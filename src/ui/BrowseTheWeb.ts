import type { Page } from '@playwright/test';

export class BrowseTheWeb {
  constructor(public readonly page: Page) {}
}
