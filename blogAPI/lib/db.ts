import { MongoClient } from "mongodb";
import { config } from 'dotenv';

const dbName = process.env.DB_NAME;
const collectionName = process.env.DB_COLLECTION;

//const uri = "mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority"; 
const uri = "---"; 

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error(err);
  }
}

async function disconnect() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB Atlas");
  } catch (err) {
    console.error(err);
  }
}

export { connect, disconnect ,uri};