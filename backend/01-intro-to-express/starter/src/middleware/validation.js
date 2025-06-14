import { validationResult } from 'express-validator'

export const validator = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()){
        res.status(422).json({status: "Unprocessable Content", errors})
        return
    }
    next();
}

export const updatePostValidator = (req, res, next) => {
  const { title, content, author } = req.body;

  const isValid = (value) => typeof value === 'string' && value.trim() !== '';

  if (isValid(title) || isValid(content) || isValid(author)) {
    return next(); 
  }

  return res.status(400).json({
    error: 'Validation failed',
    message: 'Missing required fields: title, content, or author',
  });
}
