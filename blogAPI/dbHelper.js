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
exports.deletePost = exports.getPost = exports.insertPost = void 0;
var db_js_1 = require("./db.js");
var mongodb_1 = require("mongodb");
var express = require("express");
// Define the schema for your document
// const postDocumentSchema = new mongoose.Schema({
//     id: String,
//     title: String,
//     content: String,
//     tags: [String],
//     comments: [{
//         author: String,
//         email: String,
//         content: String,
//         date: String,
//         replies: [{
//             author: String,
//             email: String,
//             content: String,
//             date: String,
//         }]
//     }],
//     created_at: String,
//     updated_at: String,
// });
var dbName = "blog"; // replace with your own database name
var collectionName = "post"; // replace with your own collection name
var app = express();
function insertPost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb_1.MongoClient(db_js_1.uri);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection(collectionName);
                    return [4 /*yield*/, collection.insertOne(post)];
                case 3:
                    _a.sent();
                    console.log("Value inserted successfully");
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 6];
                case 5:
                    client === null || client === void 0 ? void 0 : client.close();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.insertPost = insertPost;
function getPost(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, post, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb_1.MongoClient(db_js_1.uri);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection(collectionName);
                    return [4 /*yield*/, collection.findOne({ _id: postId })];
                case 3:
                    post = _a.sent();
                    if (!post) { // check if post is null or undefined
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, post];
                case 4:
                    err_2 = _a.sent();
                    console.error(err_2);
                    return [2 /*return*/, null]; // return null in case of error
                case 5:
                    client === null || client === void 0 ? void 0 : client.close();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getPost = getPost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, objectId, res, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb_1.MongoClient(db_js_1.uri);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection(collectionName);
                    objectId = new mongodb_1.ObjectId(postId);
                    return [4 /*yield*/, collection.deleteOne({ _id: objectId })];
                case 3:
                    res = _a.sent();
                    if (res.deletedCount === 1) {
                        return [2 /*return*/, true];
                    }
                    else if (res.deletedCount === 0) {
                        return [2 /*return*/, "Post not found."];
                    }
                    else {
                        console.error("Failed to delete post.");
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [2 /*return*/, false];
                case 5:
                    client === null || client === void 0 ? void 0 : client.close();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.deletePost = deletePost;
