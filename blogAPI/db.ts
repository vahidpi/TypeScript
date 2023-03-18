import { MongoClient } from "mongodb";

//mongodb://localhost:27017/

// Connect to MongoDB Atlas
// mongodb+srv://mongo:<password>@cluster0.bsyzi4a.mongodb.net/test
// mongodb+srv://mongo:<password>@cluster0.bsyzi4a.mongodb.net/?retryWrites=true&w=majority
// Cluster0

//const uri = "mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority"; // replace <username>, <password>, and <cluster-url> with your own values
const uri = "mongodb+srv://mongo:xxx@cluster0.bsyzi4a.mongodb.net/test"; 

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