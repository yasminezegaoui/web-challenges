import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import {notesRouter} from "./routes/notes.js";
import logger from "./middlewares/logger.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use("/api/notes", logger,notesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/", (_, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
