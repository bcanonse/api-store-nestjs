import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DB_PORT,
    },
    apiKey: process.env.API_KEY,
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRE_IN,
    },
    dbPostgres: {
      name: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  };
});
