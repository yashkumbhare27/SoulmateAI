'use client';

/**
 * Pusher client-side instance for subscribing to real-time channels
 * Used in client components for chat, notifications, etc.
 */
import PusherClient from 'pusher-js';

let pusherClientInstance: PusherClient | null = null;

export function getPusherClient(): PusherClient | null {
  if (typeof window === 'undefined') return null;

  if (pusherClientInstance) return pusherClientInstance;

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    console.warn(
      '[Pusher] Client not configured — set NEXT_PUBLIC_PUSHER_KEY and NEXT_PUBLIC_PUSHER_CLUSTER env vars.'
    );
    return null;
  }

  pusherClientInstance = new PusherClient(key, {
    cluster,
    authEndpoint: '/api/pusher/auth',
  });

  return pusherClientInstance;
}
