import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb"
import { getCollection } from "./database";
import { createClient } from "redis";
dotenv.config();


export const MONGO_URI: any = process.env.MONGO_URI;
export const REDIS_URI: any = process.env.REDIS_URI;
const port: any = process.env.PORT;

const app = express();

export const connection = new MongoClient(MONGO_URI);
export const redisClient = createClient({ url: REDIS_URI });
app.use(express.json());



app.get("/database", async (req, res) => {

    const collection = getCollection("users");

    try {

        const cacheUser = await redisClient.get(`user`);

        if (cacheUser) {
            console.log("get from cache");
            res.json({  message : "data retrival from redis " , user: JSON.parse(cacheUser) });
            return;
        }

        const user = await collection.find().toArray();

        if (!user) {
            res.status(404).json({ message: "no user found" });
            return;
        }

        await redisClient.set(`user`, JSON.stringify(user) , {
             EX : 5 * 60
        });
        
        res.json({ message : "data retrival from mongodb" ,  data: user });

    }
    catch (error) {

        res.status(505).json({ error: `Internal error ${error}` });
    }

})



app.listen(port, async function () {

    try {
        await connection.connect();
        await redisClient.connect();
        console.log("connected to mongodb database and redis connected");
        console.log(`server running on port ${port}`);
    }
    catch (error) {
        console.log("failed to connect")
    }

})


