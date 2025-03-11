import { MongoClient } from "mongodb";
import { secrets } from './secrets';
import { config } from 'dotenv';

// import environment variables 
config();

const dbName = process.env.DB_NAME || 'blog';
const clusterUrl = process.env.DB_CLUSTER_URL;

if (!secrets.dbUserName || !secrets.dbPassword || !clusterUrl) {
    throw new Error('Missing required MongoDB credentials in environment variables');
}

// Extract the base cluster URL without query parameters
const baseClusterUrl = clusterUrl.split('?')[0];
export const uri = `mongodb+srv://${secrets.dbUserName}:${secrets.dbPassword}@${baseClusterUrl}/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

async function disconnect() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
        throw err;
    }
}

export { connect, disconnect, client };