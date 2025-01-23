import express from "express";
import { connectToDb } from "./utils/database.js";
import componentRouter from "./routes/componentRouter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", componentRouter);

const startServer = async () => {
  try {
    await connectToDb();
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
  }
};

startServer();
