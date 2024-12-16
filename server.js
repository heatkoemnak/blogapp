import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000; // Define your app's hostname and port

// Initialize the Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  // Attach Socket.io to the HTTP server
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Replace '*' with your actual client URL in production for security
    },
  });

  // Socket.io event listeners
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast new comment to all users
    socket.on('newComment', (message) => {
      console.log('New Comment:', message);
      io.emit('newComment', message); // Emit to all connected clients
    });

    // Handle like updates
    socket.on('likes', (likes) => {
      console.log('Post Liked:', likes);
      io.emit('postLiked', likes); // Emit to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
