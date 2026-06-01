import { createClient } from "redis";
export const redisClient = createClient({

  socket:{

    host:"127.0.0.1",

    port:6379
  }
});
redisClient.on(

  "connect",

  () => {

    console.log(
      "Redis Connected"
    );
  }
);
redisClient.on(

  "error",

  (err) => {

    console.log(
      "Redis Error:",
      err.message
    );
  }
); 
export async function connectRedis(){

  await redisClient.connect();
}