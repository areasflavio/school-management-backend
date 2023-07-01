export default {
  port: process.env.PORT ?? 3333,
  secret: process.env.JWT_SECRET ?? 'secret',
};
