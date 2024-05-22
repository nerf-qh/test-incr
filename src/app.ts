import express, { Application } from 'express';

import { pool } from './db';

const app: Application = express();

app.get('/upd', async (req, res) => {
  const result = await pool.query('UPDATE test SET value = value + 1 WHERE id = 1 RETURNING value');
  console.log(`Updating value to ${result.rows[0].value}`);
  res.json(result.rows[0]);
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT value FROM test WHERE id = 1');
  console.log(`Getting value ${result.rows[0].value}`);
  res.json(result.rows[0]);
})

app.get('/reset', async (req, res) => {
  console.log('Resetting value to 0');
  await pool.query('UPDATE test SET value = 0 WHERE id = 1');
  const result = await pool.query('SELECT value FROM test WHERE id = 1');
  res.json(result.rows[0]);
})

app.get('/health', (req, res) => {
  res.sendStatus(200);
});


export { app };
