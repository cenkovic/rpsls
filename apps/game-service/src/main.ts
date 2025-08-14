import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { choicesHandler } from './handlers/choicesHandler';
import { choiceHandler } from './handlers/choiceHandler';
import { playHandler } from './handlers/playHandler';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/choices', choicesHandler);
app.get('/choice', choiceHandler);
app.post('/play', playHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
