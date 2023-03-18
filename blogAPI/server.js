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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var dbHelper_js_1 = require("./dbHelper.js");
//import bodyParser from "body-parser";
// import cors from 'cors';
var app = express();
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
app.get('/', function (req, res) {
    res.send('<h1>Blog managment Server API</h1><br/><p>REST API server by TypeScript</p>');
});
// GET /api/docs -> List of docs # Read all posts
app.get('/api/docs', function (req, res) {
    res.send('Under construction.');
});
// GET /api/doc/{id} -> json or null  # Read a post 
// The route handler function as async and then awaited the getPost function call to 
// resolve the promise. Once the promise is resolved, we store the result in the post 
// variable and then return it using res.json
app.get('/api/doc/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, dbHelper_js_1.getPost)(id)];
            case 1:
                post = _a.sent();
                res.json(post);
                return [2 /*return*/];
        }
    });
}); });
// TODO add [Auth]
// TODO validate the JSON format of request body
// POST /api/doc/{id} JSON{post parameters} -> Aknowlage # Create new blog post 
app.post('/api/doc', function (req, res) {
    var validationError = false;
    var post = req.body;
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
// TODO add [Auth]
// DELETE /api/doc/{id} -> Aknowlage # Delete blog post 
app["delete"]('/api/doc/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                if (!!id) return [3 /*break*/, 1];
                res.status(400).send("Post id is required.");
                return [3 /*break*/, 3];
            case 1:
                _b = (_a = res).send;
                return [4 /*yield*/, (0, dbHelper_js_1.deletePost)(id)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
