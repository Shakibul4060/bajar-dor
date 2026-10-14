import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("bazar-dor"); // আপনার ডাটাবেজের নাম দিতে পারেন

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    
  },
  trustedOrigins: ["http://localhost:3000"],
});