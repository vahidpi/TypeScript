import { connect, disconnect, uri } from "./db";
import { MongoClient, Db, ObjectId } from "mongodb";
import * as express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UpdateQuery, FilterQuery } from 'mongoose';
import { Post } from "./modules";

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



// TODO save the db name adn collection name in  env. variable file 
const dbName = "blog"; // replace with your own database name
const collectionName = "post"; // replace with your own collection name

const app = express();

async function insertPost(post: Post): Promise<boolean>  {
    let client: MongoClient;
    client = new MongoClient(uri);
    try {
        await client.connect();
        const db: Db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne(post);
        // console.log("Value inserted successfully");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        client?.close();
    }
}


async function getPost(postId: String) {
    let client: MongoClient;
    client = new MongoClient(uri);
    try {
        await client.connect();
        const db: Db = client.db(dbName);
        const collection = db.collection(collectionName);
        const post = await collection.findOne({ _id: postId });
        if (!post) { // check if post is null or undefined
            return null;
        }
        return post;
    } catch (err) {
        console.error(err);
        return null; // return null in case of error
    } finally {
        client?.close();
    }
}

async function getPostList() {
    let client: MongoClient;
    client = new MongoClient(uri);
    try {
        await client.connect();
        const db: Db = client.db(dbName);
        const collection = db.collection(collectionName);
        const postsList = await collection.find({}).toArray();
        if (!postsList || postsList.length === 0) { // check if post is null or undefined
            console.log("Post list is null")
            return null;
        }
        return postsList;
    } catch (err) {
        console.error(err);
        return null; // return null in case of error
    } finally {
        client?.close();
    }
}


async function deletePost(postId: string) {
    let client: MongoClient;
    client = new MongoClient(uri);
    try {
        await client.connect();
        const db: Db = client.db(dbName);
        const collection = db.collection(collectionName);
        const objectId = new ObjectId(postId);
        const res = await collection.deleteOne({ _id: objectId });
        if (res.deletedCount === 1) {
            return true;
        } else if (res.deletedCount === 0) {
            return "Post not found.";
        } else {
            console.error("Failed to delete post.");
            return false
        }
    } catch (err) {
        console.error(err);
        return false
    } finally {
        client?.close();
    }
}

async function updatePost(postId: string, post: Post) {
    let client: MongoClient;
    client = new MongoClient(uri);
    try {
        await client.connect();
        const db: Db = client.db(dbName);
        const collection = db.collection(collectionName);
        const objectId = new ObjectId(postId);
        const res = await collection.updateOne({ _id: objectId }, { $set: post })
    } catch (err) {
        console.error(err);
        return false
    } finally {
        client?.close();
    }
}

export { insertPost, getPost, deletePost, getPostList, updatePost };