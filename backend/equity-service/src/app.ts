import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Equity Service Running");
});

app.get("/holdings", (req, res) => {
  res.json([
    {
      stock: "TCS",
      quantity: 10,
      price: 3500
    }
  ]);
});

export default app;