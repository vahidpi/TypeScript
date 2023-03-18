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
exports.deletePost = exports.getPost = exports.insertPost = void 0;
const db_js_1 = require("./db.js");
const mongodb_1 = require("mongodb");
const express = require("express");
const dbName = "blog";
const collectionName = "post";
const app = express();
function insertPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        client = new mongodb_1.MongoClient(db_js_1.uri);
        try {
            yield client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            yield collection.insertOne(post);
            console.log("Value inserted successfully");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.close();
        }
    });
}
exports.insertPost = insertPost;
function getPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        client = new mongodb_1.MongoClient(db_js_1.uri);
        try {
            yield client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const post = yield collection.findOne({ _id: postId });
            if (!post) {
                return null;
            }
            return post;
        }
        catch (err) {
            console.error(err);
            return null;
        }
        finally {
            client === null || client === void 0 ? void 0 : client.close();
        }
    });
}
exports.getPost = getPost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        client = new mongodb_1.MongoClient(db_js_1.uri);
        try {
            yield client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const objectId = new mongodb_1.ObjectId(postId);
            const res = yield collection.deleteOne({ _id: objectId });
            if (res.deletedCount === 1) {
                return true;
            }
            else if (res.deletedCount === 0) {
                return "Post not found.";
            }
            else {
                console.error("Failed to delete post.");
                return false;
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
        finally {
            client === null || client === void 0 ? void 0 : client.close();
        }
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=dbHelper.js.map