import { http, HttpResponse, delay } from 'msw';
import { users } from '../db';

function makeToken(user: { id: string; email: string; name: string; role: string }) {
  const header = btoa(JSON.stringify({ alg: 'none' }));
  const payload = btoa(JSON.stringify({ user, exp: Date.now() + 86400000 }));
  return `${header}.${payload}.mock`;
}

export const authHandlers = [
  http.post('/api/auth/register', async ({ request }) => {
    await delay(300);
    const { email, password } = (await request.json()) as { email: string; password: string };
    if (users.has(email)) return HttpResponse.json({ error: 'Пользователь уже существует' }, { status: 409 });
    const user = { id: `user-${Date.now()}`, email, name: email.split('@')[0]!, role: 'user' as const };
    users.set(email, { user, password });
    return HttpResponse.json({ token: makeToken(user), user });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    await delay(300);
    const { email, password } = (await request.json()) as { email: string; password: string };
    const record = users.get(email);
    if (!record || record.password !== password) return HttpResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    return HttpResponse.json({ token: makeToken(record.user), user: record.user });
  }),

  http.post('/api/auth/forgot', async () => {
    await delay(300);
    return HttpResponse.json({ message: 'Инструкции отправлены на почту' });
  }),
];
