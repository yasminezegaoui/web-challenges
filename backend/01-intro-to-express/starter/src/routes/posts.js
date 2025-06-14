import express from "express";
import logger from "../middleware/logger.js";
import { createPost, deletePost, getPostById, getPosts, getPostsByAuthor, updatePost } from "../controllers/postsController.js";
import {body} from 'express-validator'
import {updatePostValidator,validator} from '../middleware/validation.js'
import { createdAt, updatedAt } from "../middleware/timesatamp.js";

export const routes = express.Router();

routes.get("/", logger, getPosts);

// single post by id
routes.get("/:id", logger, getPostById)

// all posts filtered by author
routes.get("/author/:author", logger, getPostsByAuthor)


const postValidator = [
    body('title')
        .optional()
        .isString()
        .withMessage('title must be a string')
        .isLength({min: 3, max: 20})
        .withMessage('Invalid title length'),

    body('content')
        .optional()
        .isString()
        .withMessage('content must be a string')
        .isLength({min: 3, max: 100})
        .withMessage('Invalid content length'),

    body('author')
        .optional()
        .isString()
        .withMessage('Author must be a string')
        .isLength({min: 3, max: 20})
        .withMessage('Invalid author length'),

]

// create new post
routes.post("/", postValidator, validator, createdAt, updatedAt, logger, createPost)

// update post by id
routes.put("/:id", updatedAt,  postValidator, validator, updatePostValidator, logger, updatePost)

// delete post by id
routes.delete("/:id", logger, deletePost)