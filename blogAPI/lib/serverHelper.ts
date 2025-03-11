import { Post } from "./models";
import { Request, Response } from 'express';
import { insertPost, deletePost, updatePost, getPostList, getPost } from './dbHelper';
import * as jwt from 'jsonwebtoken';
import { secrets } from './secrets';

interface ValidationResult {
    success: boolean;
    message?: string;
}

function validatePost(post: any): ValidationResult {
    if (!post.title || !post.content || !post.author) {
        return {
            success: false,
            message: 'Missing required fields: title, content, and author are required'
        };
    }
    return { success: true };
}

async function createPostHandler(req: Request, res: Response) {
    const post = req.body;
    const validationResult = validatePost(post);

    if (validationResult.success) {
        const result = await insertPost(post);
        if (result) {
            res.status(201).json({ message: 'Post created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create post' });
        }
    } else {
        res.status(400).json({ error: validationResult.message });
    }
}

async function deletePostHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Post id is required.");
    } else {
        try {
            const result = res.send(await deletePost(id));
            if (result) {
                res.status(200).send('OK');
            } else {
                res.status(500);
            }
        } catch (err) {
            console.error(err);
            res.status(500);
        }
    }
}

async function updatePostHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const post = req.body as Post;
    if (!id) {
        res.status(400).send("Post id is required.");
        return
    }
    const validationResult = validatePost(post);
    if (!validationResult.success) {
        res.status(400).send({ error: validationResult.message });
        return
    }
    res.send(await updatePost(id, post));
}

async function getPostListHandler(req: Request, res: Response): Promise<void> {
    const postList = await getPostList();
    res.json(postList);
}

async function getPostByIdHandler(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const post = await getPost(id);
    res.json(post);
}

function loginHandler(req: Request, res: Response) {
    const { username, password } = req.body;
    // Verify user credentials
    // TODO read user pass from db
    if (username === secrets.dbUserName && password === secrets.dbPassword) {
        // Generate JWT token
        const token = jwt.sign({ username }, secrets.jwtSecret, {
            expiresIn: '1h'
        });
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
}

export { createPostHandler, deletePostHandler, updatePostHandler, getPostListHandler, getPostByIdHandler, loginHandler, validatePost, ValidationResult };