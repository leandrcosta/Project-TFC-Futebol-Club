import { Request, Response, NextFunction } from 'express';

const requestRequiredFields = {
  login: ['email', 'password'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

export default verifyRequiredFields;

/* Função desenvolvida na mentoria, junto do Ivan! Talvez tenha que mudar ela,
com o desenvolvimento do projeto. */
