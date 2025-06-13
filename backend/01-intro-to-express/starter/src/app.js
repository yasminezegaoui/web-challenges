import express from "express";
import { routes } from "./routes/posts.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/posts", routes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

app.get('/', (req, res) => {
  res.send('Welcome to the Mini Blog API!');
});
