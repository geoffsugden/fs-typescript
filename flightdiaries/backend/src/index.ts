import express from 'express';
import cors, { type CorsOptions } from 'cors';
import diaryRouter from './routes/diaries.ts';

const app = express();
const corsOptions: CorsOptions = { origin: 'http://localhost:5173' };
app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
