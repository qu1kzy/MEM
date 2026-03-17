import { http, HttpResponse, delay } from 'msw';
import { drafts } from '../db';

export const draftHandlers = [
  http.post('/api/drafts', async ({ request }) => {
    await delay(300);
    const { userId, draft } = (await request.json()) as { userId: string; draft: Record<string, unknown> };
    const userDrafts = drafts.get(userId) || [];
    const newDraft = { ...draft, id: `draft-${Date.now()}`, createdAt: new Date().toISOString() };
    userDrafts.push(newDraft);
    drafts.set(userId, userDrafts);
    return HttpResponse.json({ draftId: newDraft.id });
  }),

  http.get('/api/drafts', async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || '';
    return HttpResponse.json({ drafts: drafts.get(userId) || [] });
  }),
];
