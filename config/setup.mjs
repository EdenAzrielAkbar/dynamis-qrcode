import "dotenv/config";
import { MongoClient } from "mongodb";

async function init() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("AKyuarB");
    const users = database.collection("users");

    //dummy data
    const query = {
      gmail: "tes@gmail.com",
      link_tujuan: "http://tes.com",
      is_active: 1,
      qr_code: "kjsndakjsdajsd",
    };
    const user = await users.insertOne(query);
    console.log(user);
  } finally {
    await client.close();
  }
}

init().catch(console.dir);
