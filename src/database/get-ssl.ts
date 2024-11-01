type SslOptions = boolean | { rejectUnauthorized: boolean };

export const getSsl = (): SslOptions => {
  // Entorno de ambiente
  return process.env.NODE_ENV == 'production'
    ? { rejectUnauthorized: false }
    : false;
};
