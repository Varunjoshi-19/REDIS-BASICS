import { connection } from "./server";
import dotenv from "dotenv";
dotenv.config();

const databaseName = process.env.DATABASE_NAME;
console.log(databaseName);

export  function getCollection(collectionName : string) {

    const database = connection.db(databaseName);
    const collection = database.collection(collectionName);
    return collection;


}

