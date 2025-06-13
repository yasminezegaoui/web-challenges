import express from "express";
import logger from "../middleware/logger.js";
import { getPosts } from "../controllers/postsController.js";
import {body} from 'express-validator'
import {validator} from '../middleware/validation.js'
import postsData from '../data/posts.js'; 

export const routes = express.Router();

routes.get("/", logger, getPosts);

// single post by id
routes.get("/id/:id", (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)

    const post = postsData.posts.find((post) => {
        if(post.id === id){
            return post
        }
    })
    res.status(200).json(post)
})

// all posts filtered by author
routes.get("/author/:author", (req, res) => {
    const author = req.params.author.toLowerCase()
    console.log(author)

    const post = postsData.posts.filter((post) => {
        if(post.author.toLowerCase() === author){
            return post
        }
    })
    res.status(200).json(post)
})


const createPostValidator = [
    body('id')
        .isInt()
        .withMessage('Invalid id type'),

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
        .withMessage('Invalid author type'),

    body('createdAt')
        .isISO8601()
        .withMessage('Invalid date format')

]

// create new post
routes.post("/", createPostValidator, validator, (req,res) => {

    const post = req.body
    console.log(post)

    postsData.posts.push(post)
    console.log(postsData.posts)

    res.status(201).json(post)
})

// update post by id
routes.put("/id/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const updatedPost = req.body;

    const index = postsData.posts.findIndex((post) => {
                    if(post.id === id){
                        return post
                    }
                  });

    if (index === -1) {
        return res.status(404).json({ error: "Post not found" });
    }

    postsData.posts[index] = { ...postsData.posts[index], ...updatedPost };

    res.status(200).json({ message: "Post updated", post: postsData.posts[index] });
})

// delete post by id
routes.delete("/id/:id", (req,res) => {
    const id = parseInt(req.params.id)
    console.log(id)

    const result = postsData.posts.filter(post => post.id !== id)
    postsData.posts = result
    res.status(200).json(result)
})