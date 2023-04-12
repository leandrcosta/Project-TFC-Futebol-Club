import { NextFunction, Request, Response } from 'express';

const validateFieldsLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const isValidEmail = emailRegex.test(email);
  const isValidPassword = (password.length < 6);

  if (!isValidEmail || isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateFieldsLogin;
