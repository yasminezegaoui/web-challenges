import express from "express";
import logger from "../middleware/logger.js";
import { createPost, deletePost, getPostById, getPosts, getPostsByAuthor, updatePost } from "../controllers/postsController.js";
import {body} from 'express-validator'
import {validator} from '../middleware/validation.js'
import { createdAt, updatedAt } from "../middleware/timesatamp.js";

export const routes = express.Router();

routes.get("/", logger, getPosts);

// single post by id
routes.get("/:id", logger, getPostById)

// all posts filtered by author
routes.get("/author/:author", logger, getPostsByAuthor)


const createPostValidator = [
    body('title')
        .isString()
        .isLength({min: 3, max: 20})
        .withMessage('Invalid title length'),

    body('content')
        .isString()
        .isLength({min: 3, max: 100})
        .withMessage('Invalid content length'),

    body('author')
        .isString()
        .isLength({min: 3, max: 20})
        .withMessage('Invalid author type'),

]

// create new post
routes.post("/", createPostValidator, validator, createdAt, updatedAt, logger, createPost)

// update post by id
routes.put("/:id", updatedAt , logger, updatePost)

// delete post by id
routes.delete("/:id", logger, deletePost)