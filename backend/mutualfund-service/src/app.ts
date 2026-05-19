import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mutual Fund Service Running");
});

app.get("/funds", (req, res) => {
  res.json([
    {
      fund: "SBI BlueChip",
      units: 120,
      nav: 85
    }
  ]);
});

export default app;