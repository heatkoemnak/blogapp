import { pusherServer } from '../../utils/pusher';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    console.log('Request Body:', body);
    // Validate required fields
    const { channel, event, message } = body;

    if (!channel || !event || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: channel, event, or message' },
        { status: 400 }
      );
    }

    // Trigger Pusher event
    await pusherServer.trigger(channel, event, { message });

    // Respond successfully
    return NextResponse.json(
      { success: true, message: message },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error triggering Pusher:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to test sockets',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
