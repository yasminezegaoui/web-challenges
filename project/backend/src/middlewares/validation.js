import { body, validationResult } from 'express-validator'

export const validator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({ status: "Unprocessable Content", errors })
    }
    next()
}


export const noteValidators = (requireAll = true) => {
    // required or optional
    const reqOrOpt = (field) => requireAll ? field.notEmpty() : field.optional()

    return [
        reqOrOpt(body('title'))
            .isString()
            .isLength({ min: 3, max: 50 })
            .withMessage('Title must be 3-50 characters'),

        reqOrOpt(body('content'))
            .isString()
            .isLength({ min: 10, max: 500 })
            .withMessage('Content must be 10-500 characters'),

        reqOrOpt(body('authorName'))
            .isString()
            .isLength({ min: 3, max: 100 })
            .withMessage('Author name must be 3-100 characters'),

        body('isPublic')
            .optional()
            .isBoolean()
            .withMessage('isPublic must be true or false'),
    ]
}
