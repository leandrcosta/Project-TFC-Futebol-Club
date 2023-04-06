import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'Batatinha';

const createToken = (data: string) => {
  const signOptions: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '7d' };
  const token = jwt.sign({ data }, secret, signOptions);
  return token;
};

const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };
// Função do BlogsApi;
