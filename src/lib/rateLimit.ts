/**
 * ===========================================================================
 * SIMPLE IN-MEMORY RATE LIMIT
 * ===========================================================================
 * Lightweight fixed-window limiter keyed by client IP. Requires no database.
 *
 * NOTE: state lives in the server process memory. On serverless platforms
 * (Vercel) each instance keeps its own counter, so this is a practical spam
 * speed-bump rather than a hard guarantee. That is intentional — the brief
 * asks for basic rate limiting without introducing a database.
 * ===========================================================================
 */

type Entry = { count: number; resetAt: number };

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // per IP per window

const store = new Map<string, Entry>();

export function rateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  // Opportunistic cleanup so the map does not grow unbounded.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
