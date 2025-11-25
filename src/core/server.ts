import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from '../routes/index';

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api', routes);

const PORT = 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;