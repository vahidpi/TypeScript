import { connect, disconnect, client } from "./db";
import { ObjectId } from "mongodb";
//import * as express from 'express';
import express from 'express';
import { Post } from "./models";
import { config } from 'dotenv';

config();
const dbName = process.env.DB_NAME as string;
const collectionName = process.env.DB_COLLECTION as string;

const app = express();

async function insertPost(post: Post): Promise<boolean> {
    try {
        await connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(post);
        return result.acknowledged;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await disconnect();
    }
}

async function getPost(postId: string) {
    try {
        await connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const post = await collection.findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return null;
        }
        return post;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        await disconnect();
    }
}

async function getPostList() {
    try {
        await connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const postsList = await collection.find({}).toArray();
        if (!postsList || postsList.length === 0) {
            console.log("No posts found");
            return null;
        }
        return postsList;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        await disconnect();
    }
}

async function deletePost(postId: string) {
    try {
        await connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const objectId = new ObjectId(postId);
        const res = await collection.deleteOne({ _id: objectId });
        if (res.deletedCount === 1) {
            return true;
        } else if (res.deletedCount === 0) {
            return "Post not found.";
        } else {
            console.error("Failed to delete post.");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await disconnect();
    }
}

async function updatePost(postId: string, post: Post) {
    try {
        await connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const objectId = new ObjectId(postId);
        const res = await collection.updateOne({ _id: objectId }, { $set: post });
        return res.modifiedCount === 1;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        await disconnect();
    }
}

export { insertPost, getPost, deletePost, getPostList, updatePost };