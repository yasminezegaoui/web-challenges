export const createdAt = (req, res, next) => {
    const date = new Date()
    console.log(date.toISOString())

    const post = req.body
    post.createdAt = date.toISOString()
    
    next()
}

export const updatedAt = (req, res, next) => {
    const date = new Date()
    console.log(date.toISOString())

    const post = req.body
    post.updatedAt = date.toISOString()

    next()
}