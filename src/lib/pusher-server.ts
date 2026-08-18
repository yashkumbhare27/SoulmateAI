/**
 * Pusher server-side instance for triggering real-time events
 * Used in Route Handlers and Server Actions only
 */
import Pusher from 'pusher';

// Create a lazy singleton to avoid errors when env vars aren't set
let pusherInstance: Pusher | null = null;

export function getPusherServer(): Pusher {
  if (pusherInstance) return pusherInstance;

  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    // Return a mock Pusher that logs instead of sending
    console.warn('[Pusher] Server not configured — using mock mode. Set PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER env vars.');
    return {
      trigger: async (channel: string, event: string, data: unknown) => {
        console.log(`[Pusher Mock] trigger: ${channel} / ${event}`, data);
        return {} as never;
      },
    } as unknown as Pusher;
  }

  pusherInstance = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });

  return pusherInstance;
}
