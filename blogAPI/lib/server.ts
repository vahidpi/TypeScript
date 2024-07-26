//import * as express from 'express';
import express from 'express';
import { Request, Response } from 'express';
import authMiddleware from './auth';
import { createPostHandler, deletePostHandler, updatePostHandler, loginHandler, getPostListHandler, getPostByIdHandler } from './serverHelper';


const app = express();
app.use(express.json());

// Write unit tests to ensure that each API endpoint is working as expected
// Documentation swagger?
// api-test by typescript or kotlin


// Extra feature
// 1. add paging and limit to GET /api/docs

// GET / # Print out about server
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Blog management Server API</h1><br/><p>REST API server by TypeScript</p>');
});


// User authentication
app.post('/login', loginHandler);


// Get all posts
// GET /api/docs -> List of docs # Read all posts
app.get('/api/docs', getPostListHandler);


// Get a post by id
// GET /api/doc/{id} -> json or null  # Read a post 
// The route handler function as async and then awaited the getPost function call to 
// resolve the promise. Once the promise is resolved, we store the result in the post 
// variable and then return it using res.json
app.get('/api/doc/:id', getPostByIdHandler);

// Create new blog post, needs Authentication
// POST /api/doc JSON{post parameters} -> Acknowledge 
app.post('/api/doc', authMiddleware, createPostHandler);

// Delete a blog post by id, needs Authentication
// DELETE /api/doc/{id} -> true,false,Post not found 
app.delete('/api/doc/:id', authMiddleware, deletePostHandler);

// Update a blog post by id, needs Authentication
// PUT /api/doc/{id} JSON{post parameters} -> Acknowledge 
app.put('/api/doc/:id', authMiddleware, updatePostHandler);

app.listen(3000, () => {
    console.log('Blog API started on started at http://localhost:3000');
});
