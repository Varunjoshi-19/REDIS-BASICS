import { client } from "./client";



async function init() {

    
    const result = await client.get("username");
    console.log("result -> " , result);

    const height = await client.get("height:1");

    console.log("height : " , height);

    const names : string[] = await client.lRange("companies" , 0 , -1);
  
    names.map((name) => {
         
        console.log(name);

    })

}


init();
