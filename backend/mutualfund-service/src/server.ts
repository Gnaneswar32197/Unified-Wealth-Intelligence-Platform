// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app";

// const PORT =
//   process.env.PORT || 5002;

// app.listen(PORT, () => {

//   console.log(
//     `MF Service Running on ${PORT}`
//   );
// });
import dotenv from "dotenv";
dotenv.config();

import "./db/index";

import app from "./app";

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`MF Service Running on ${PORT}`);
});