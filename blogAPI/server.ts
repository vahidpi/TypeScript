import * as express from 'express';
import { Request, Response } from 'express';
import { insertPost, getPost, deletePost } from "./dbHelper.js";
import { Post } from "./model.js";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
//import bodyParser from "body-parser";
// import cors from 'cors';

const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use(bodyParser.json());
app.use(express.json());
//app.use(cors());


// APIs: create, read, update, and delete blog posts
// Each blog post should have a title, content, and author
// Use a MongoDB database to store the blog posts
// Implement authentication using JWT tokens and allow only authenticated users to create, update, and delete blog posts
// Write unit tests to ensure that each API endpoint is working as expected
// Documentation swagger?
// POST /api/doc/{id} JSON{post parameters} -> Aknowlage # Update blog post [Auth]
// each blog post is a doc



// Use sercret key file, to store db pass
// Define a en. var file, for post, dbname, collection etc

// GET / # Print out about server
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Blog managment Server API</h1><br/><p>REST API server by TypeScript</p>');
});

// GET /api/docs -> List of docs # Read all posts
app.get('/api/docs', (req: Request, res: Response) => {
    res.send('Under construction.');
});


// GET /api/doc/{id} -> json or null  # Read a post 
// The route handler function as async and then awaited the getPost function call to 
// resolve the promise. Once the promise is resolved, we store the result in the post 
// variable and then return it using res.json
app.get('/api/doc/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await getPost(id);
    res.json(post);
});

// TODO add [Auth]
// TODO validate the JSON format of request body
// POST /api/doc/{id} JSON{post parameters} -> Aknowlage # Create new blog post 
app.post('/api/doc', (req, res) => {
    let validationError = false;
    const post = req.body as Post;
    if (!post.content) {
        res.status(400).send("Post content is required.");
        validationError = true;
    }
    if (!post.title) {
        res.status(400).send("Post title is required.");
        validationError = true;
    }
    if (!post.author) {
        res.status(400).send("Author name is required");
        validationError = true;
    }
    if (!validationError) {
        insertPost(post);
        res.status(200).send('OK');
    }
});

// TODO add [Auth]
// DELETE /api/doc/{id} -> true,false,Post not found # Delete blog post 
app.delete('/api/doc/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Post id is required.");
    } else {
        res.send(await deletePost(id));
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});