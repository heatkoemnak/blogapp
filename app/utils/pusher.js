import PusherSever from 'pusher';
import Pusher from 'pusher-js';

export const pusherServer = new PusherSever({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  forceTLS: true,
});
