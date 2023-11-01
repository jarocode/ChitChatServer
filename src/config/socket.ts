import { Server, Socket } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import { Express } from 'express';

export const initSocket = (
  app: Express
): { server: HTTPServer; io: Server } => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    // You can implement your Socket.io logic here
  });

  return { io, server };
};
