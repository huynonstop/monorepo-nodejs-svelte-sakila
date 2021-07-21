import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import apiRouter from "./routers/api.js";
const app = express();

app.use(cors());
app.use(express.json());

console.log("Loading API route");
app.get("/", (req, res) => {
  res.json({
    message: "I'm alive",
  });
});
app.use(apiRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "NotFound",
    message: "Not Found",
  });
});

app.use((err, req, res) => {
  if (err.status && err.name) {
    return res.status(err.status).json({
      message: err.message,
      error: err.name,
    });
  }
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
