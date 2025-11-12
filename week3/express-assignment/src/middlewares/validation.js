import { validationResult } from 'express-validator';

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, message: 'Validation failed', details: errors.array() });
  }
  next();
};

export { handleValidation };
