import { authHandlers } from './auth';
import { orderHandlers } from './orders';
import { draftHandlers } from './drafts';
import { promoHandlers } from './promo';
import { adminHandlers } from './admin';

export const handlers = [
  ...authHandlers,
  ...orderHandlers,
  ...draftHandlers,
  ...promoHandlers,
  ...adminHandlers,
];
