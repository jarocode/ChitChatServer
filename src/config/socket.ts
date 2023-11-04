import { Server } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import { Express } from 'express';

export const initSocket = (
  app: Express
): { httpServer: HTTPServer; io: Server } => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  return { io, httpServer };
};
