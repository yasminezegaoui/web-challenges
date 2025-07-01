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