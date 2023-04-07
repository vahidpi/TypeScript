import * as express from 'express';
import { Request, Response } from 'express';
import { insertPost, getPost, deletePost, getPostList, updatePost } from "./dbHelper";
import { Post } from "./modules";
import * as jwt from 'jsonwebtoken';
import authMiddleware from './auth';



const app = express();


app.use(express.json());




// Write unit tests to ensure that each API endpoint is working as expected
// Documentation swagger?
// api-test by typescript or kotlin




// Use sercret key file, to store db pass
// Define a en. var file, for post, dbname, collection etc

// Extra feature
// 1. add paging and limit to GET /api/docs

// GET / # Print out about server
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Blog managment Server API</h1><br/><p>REST API server by TypeScript</p>');
});


// User authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verify user credentials
    // TODO read user pass from db
    if (username === 'usr' && password === 'pwd') {
        // Generate JWT token
        const token = jwt.sign({ username }, 'your-secret-key-goes-here', {
            expiresIn: '1h'
        });
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
});


// Get all posts
// GET /api/docs -> List of docs # Read all posts
app.get('/api/docs', async (req: Request, res: Response) => {
    const postList = await getPostList();
    res.json(postList);
});


// Get a post by id
// GET /api/doc/{id} -> json or null  # Read a post 
// The route handler function as async and then awaited the getPost function call to 
// resolve the promise. Once the promise is resolved, we store the result in the post 
// variable and then return it using res.json
app.get('/api/doc/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await getPost(id);
    res.json(post);
});

// Create new blog post, needs Authentication
// TODO validate the JSON format of request body
// POST /api/doc JSON{post parameters} -> Aknowlage 
app.post('/api/doc', authMiddleware, (req, res) => {
    const post = req.body as Post;
    const validationResult = validatePost(post);
    if (validationResult.success) {
        if (insertPost(post)) {
            res.status(200).send('OK');
        } else {
            res.status(500);
        }

    } else {
        res.status(400).send({ error: validationResult.message });
    }
});

// Delete a blog post by id, needs Authentication
// DELETE /api/doc/{id} -> true,false,Post not found 
app.delete('/api/doc/:id', authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Post id is required.");
    } else {
        res.send(await deletePost(id));
    }
});

// Update a blog post by id, needs Authentication
// PUT /api/doc/{id} JSON{post parameters} -> Aknowlage 
app.put('/api/doc/:id', authMiddleware, async (req: Request, res: Response) => {
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
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// TODO move to server_Helper

interface ValidationResult {
    success: boolean;
    message?: string;
}

function validatePost(post: Post): ValidationResult {
    const result: ValidationResult = { success: true };

    if (!post.content) {
        result.success = false;
        result.message = "Post content is required.";
    }

    if (!post.title) {
        result.success = false;
        result.message = "Post title is required.";
    }

    if (!post.author) {
        result.success = false;
        result.message = "Author name is required.";
    }

    if (result.success) {
        insertPost(post);
    }

    return result;
}