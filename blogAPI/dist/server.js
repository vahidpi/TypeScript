"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dbHelper_js_1 = require("./dbHelper.js");
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('<h1>Blog managment Server API</h1><br/><p>REST API server by TypeScript</p>');
});
app.get('/api/docs', (req, res) => {
    res.send('Under construction.');
});
app.get('/api/doc/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const post = yield (0, dbHelper_js_1.getPost)(id);
    res.json(post);
}));
app.post('/api/doc', (req, res) => {
    let validationError = false;
    const post = req.body;
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
        (0, dbHelper_js_1.insertPost)(post);
        res.status(200).send('OK');
    }
});
app.delete('/api/doc/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Post id is required.");
    }
    else {
        res.send(yield (0, dbHelper_js_1.deletePost)(id));
    }
}));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
//# sourceMappingURL=server.js.map