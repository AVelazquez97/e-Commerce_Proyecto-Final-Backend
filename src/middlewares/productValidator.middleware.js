import { validationResult } from 'express-validator';

const productValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

export default productValidator;