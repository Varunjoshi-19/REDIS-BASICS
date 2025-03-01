import { createClient } from 'redis';

export const client = createClient({
  url: 'redis://localhost:6380', // Default Redis port
});



(async () => {
     
try { 
   await client.connect();
   console.log("Redis connected on PORT:6380");

}
catch(error) {
     console.log(error);
}


})();




