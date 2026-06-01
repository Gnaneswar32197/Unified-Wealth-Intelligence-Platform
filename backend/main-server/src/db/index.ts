import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});



export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log("Connected to Supabase PostgreSQL");
  })
  .catch((err) => {
    console.log("FULL DB ERROR:");
    console.log(err);
  });