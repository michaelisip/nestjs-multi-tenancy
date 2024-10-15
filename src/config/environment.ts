export const environment = {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    salt_rounds: Number(process.env.SALT_ROUNDS) || 10
  }
};