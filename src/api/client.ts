export class ApiError extends Error {
  constructor(public status: number, public data: unknown) {
    super(`API Error: ${status}`);
  }
}

export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('mem-token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(response.status, data);
  }

  return response.json();
}
