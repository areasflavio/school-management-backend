import env from './config/env';
import prisma from './config/prisma';
import terminal from './config/terminal';

prisma
  .$connect()
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => terminal(Number(env.port)));
  })
  .catch(console.error);
