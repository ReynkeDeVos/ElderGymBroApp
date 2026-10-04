// fetch wrapper for the backend: sends JSON (or FormData), includes the auth cookie,
// and throws the server's error message on non-2xx responses.
export const api = async (path, { method = 'GET', body } = {}) => {
  const isJson = body !== undefined && !(body instanceof FormData);
  const res = await fetch(import.meta.env.VITE_API_URL + path, {
    method,
    credentials: 'include',
    headers: isJson ? { 'Content-Type': 'application/json' } : undefined,
    body: isJson ? JSON.stringify(body) : body,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.error ?? `Request failed (${res.status})`), { status: res.status });
  return data;
};
