import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/authFunctions';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;// pego o token que veio no autorization
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const payload = verifyToken(authorization);
    req.body.data = payload; // req transita por todas as rotas
    // console.log('==>1', payload);
    // console.log('==>2', req.body);
    console.log('==>3', req.body.data); // adicionei o campo data[linha 10]
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
