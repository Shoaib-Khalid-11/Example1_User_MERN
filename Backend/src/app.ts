import express, { type Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/index.ts";
import dbConnection from "./db/connectionDB.ts";
import { appErrorMiddleWare } from "./middlewares/errorHandler.middleware.ts";
dotenv.config({ path: "./env/.env" });

const app: Application = express();
// app.options("/*", cors());
app.use(
  cors({
    origin: [process.env.DASHBOARD_URL || "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

dbConnection();
app.use(appErrorMiddleWare);

export default app;
