import { MongoClient } from "mongodb";
import { secrets } from './secrets';
import { config } from 'dotenv';

// import environment variables 
config();
const clusterUrl = process.env.DB_CLUSTER_URL;

const uri = "mongodb+srv://" + secrets.dbUserName + ":" + secrets.dbPassword + "@" + clusterUrl + "/test";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  }
}

async function disconnect() {
  try {
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

export { connect, disconnect, client };