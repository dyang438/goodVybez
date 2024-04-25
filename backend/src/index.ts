import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import accountRouter from './routes/accountRoutes';
import postRouter from './routes/postRoutes';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['k1', 'k2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.json());

const MONGO_URI = process.env.MONGODB_URI ?? '';
mongoose.connect(MONGO_URI)
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// define root route
app.get('/', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

app.get('/api/bye', (_, res) => {
  return res.json({ message: 'Bye, frontend!' });
});

app.get('/api/hello', (_, res) => {
  return res.json({ message: 'Hello, frontend!' });
});

// account routes
app.use('/api/account', accountRouter);

// question routes
app.use('/api/questions', postRouter);

// listen
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}.`);
});
