import express, { Request, Response } from 'express';
import axios from 'axios';
import { client } from './client';


const app = express();

app.get('/', dummyData);



async function dummyData(req: Request, res: Response): Promise<any> {

    const cacheValue  = await client.json.get("todos:1");

    if (cacheValue) return res.json(cacheValue);


    const { data }   = await axios.get("https://jsonplaceholder.typicode.com/todos");


    
    await client.json.set("todos:1", '$', data);
    await client.expire("todos:1" , 20);

    res.json(data);

}



const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
