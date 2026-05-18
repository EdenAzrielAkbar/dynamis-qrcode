import "dotenv/config";
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

await client.connect();
console.log("berhasil terkoneksi dengan database");

const db = client.db(dbName);

const ConnectDb = db.collection("users");

export { ConnectDb };
