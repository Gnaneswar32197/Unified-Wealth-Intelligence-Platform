import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import investorRoutes from "./routes/investor.routes";
import roleRoutes from "./routes/role.routes";
import rmRoutes from "./routes/rm.routes";
import advisorRoutes from "./routes/advisor.routes";
import operationsRoutes from "./routes/operations.routes";
import complianceRoutes from "./routes/compliance.routes";
import securityRoutes from "./routes/security.routes";
import auditRoutes from "./routes/audit.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/rm", rmRoutes);
app.use("/api/advisor", advisorRoutes);
app.use("/api/operations", operationsRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/audit", auditRoutes);


export default app;