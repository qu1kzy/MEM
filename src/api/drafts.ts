import { apiClient } from './client';

export async function saveDraft(userId: string, draft: Record<string, unknown>): Promise<{ draftId: string }> {
  return apiClient('/api/drafts', { method: 'POST', body: JSON.stringify({ userId, draft }) });
}

export async function getDrafts(userId: string): Promise<{ drafts: Record<string, unknown>[] }> {
  return apiClient(`/api/drafts?userId=${userId}`);
}
