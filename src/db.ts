import { Client, Pool, PoolClient  } from 'pg';

export const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'test',
  max: 20,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  process.exit(-1)
})

const init = async (client: PoolClient) => {
  // await
  await client.query('CREATE TABLE IF NOT EXISTS test (id serial PRIMARY KEY, value INT)');
  const result = await client.query('SELECT 1 FROM test WHERE id = 1');
  if (result.rows.length === 0) {
    await client.query('INSERT INTO test (id, value) VALUES (1, 0) ON CONFLICT DO NOTHING');
  };

  console.log('Database initialized');
}

const healthCheck = async (client: PoolClient) => {
  const result = await client.query('SELECT 1');
  console.log('DB Health check:', result.rows.length === 1 ? 'OK' : 'ERROR');
}

export const startDB = async () => {
  const client = await pool.connect();
  await init(client);
  await healthCheck(client);
  await client.query('UPDATE test SET value = 0 WHERE id = 1');
  client.release();
}

export const stopDB = async () => {
  console.log('Stopping database');
  if (!(pool as any).ended) {
    await pool.end();
  }
  console.log('Database stopped');
}
