import "dotenv/config";
import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

// 1. Koneksikan client secara global
await client.connect();
console.log("Connected successfully to MongoDB");

const db = client.db(dbName);

// 2. Ekspor koleksi secara langsung
const ConnectDb = db.collection("users");

export { ConnectDb };
