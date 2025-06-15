import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postsController.js";
import {body} from 'express-validator'
import {updatePostValidator,validator} from '../middleware/validation.js'
import { createdAt, updatedAt } from "../middleware/timesatamp.js";

export const routes = express.Router();

routes.get("/", getPosts);

// single post by id
routes.get("/:id", getPostById)

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
routes.post("/", postValidator, validator, createdAt, updatedAt, createPost)

// update post by id
routes.put("/:id", updatedAt,  postValidator, validator, updatePostValidator, updatePost)

// delete post by id
routes.delete("/:id", deletePost)