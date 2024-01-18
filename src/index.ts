import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { initSocket } from './config/socket';
import { connectDB } from './config/db';
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';
import roomRoutes from './api/routes/room.routes';
import chatRoutes from './api/routes/chat.routes';
import errorHandler from './api/middlewares/error-handlers';

dotenv.config();

//app
const app = express();
const { io, httpServer } = initSocket(app);

const port = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(function (_req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', roomRoutes);
app.use('/api', chatRoutes);
app.use(errorHandler.logErrors);
app.use(errorHandler.clientError);

//database connection
connectDB();

//socket
io.on('connection', (socket) => {
  console.log('id', socket.id);
  socket.on('chat', (data) => {
    console.log('chat', data);
    io.emit('chat', data);
    // socket.broadcast.emit('chat', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//server
httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

export default app;
