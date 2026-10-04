const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Render's free instance sleeps when idle and needs about a minute to wake. Meanwhile the Netlify
// proxy times out (5xx) or Render serves a loading page, so only a 204 from /health counts as awake.
export const backendReady = (async () => {
  while (true) {
    const res = await fetch(import.meta.env.VITE_API_URL + '/health', { cache: 'no-store' }).catch(() => null);
    if (res?.status === 204) return;
    await sleep(3000);
  }
})();

// fetch wrapper for the backend: sends JSON (or FormData), includes the auth cookie,
// and throws the server's error message on non-2xx responses.
export const api = async (path, { method = 'GET', body } = {}) => {
  // Hold requests until the backend is awake instead of letting them time out
  await backendReady;
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
