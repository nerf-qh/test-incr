import { app } from './app';
import { startDB, stopDB } from './db';

let server: ReturnType<typeof app.listen>;

const start = async () => {
  await startDB();
  server = app.listen(3000, () => {
    console.log({ msg: `Listening at http://localhost:3000/` });
  });
};


const handleExit = () => {
  console.log('Received SIGINT');
  console.log('Stopping server');
  server.close(async () => {
    console.log('Server stopped');

    await stopDB();
    process.exit(0);
  })
}

start();

process.on('SIGINT', () => {
  console.log('Received SIGINT');
  handleExit()
})

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  handleExit()
});
