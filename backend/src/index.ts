import express from 'express';
import cors from 'cors';
import { stockRouter } from './routes/stocks';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
}); 