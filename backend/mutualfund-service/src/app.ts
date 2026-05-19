// // import express from "express";
// // import cors from "cors";

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.send("Mutual Fund Service Running");
// // });

// // app.get("/funds", (req, res) => {
// //   res.json([
// //     {
// //       fund: "SBI BlueChip",
// //       units: 120,
// //       nav: 85
// //     }
// //   ]);
// // });

// // export default app;


// import express from "express";
// import cors from "cors";

// import mutualfundRoutes from "./routes/mutualfund.routes";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/mf", mutualfundRoutes);

// app.get("/", (req, res) => {
//   res.send("Mutual Fund Service Running");
// });

// export default app;

import express from "express";
import cors from "cors";

import fundRoutes from "./routes/fund.routes";
import sipRoutes from "./routes/sip.routes";
import navRoutes from "./routes/nav.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/mf/funds", fundRoutes);

app.use("/api/mf/sips", sipRoutes);

app.use("/api/mf/nav", navRoutes);

app.use("/api/mf/analytics", analyticsRoutes);

export default app;