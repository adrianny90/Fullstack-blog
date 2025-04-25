import express from "express";
import cors from "cors";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
} from "./crudOperations.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/posts", getAllPosts);

app.get("/posts/:id", getOnePost);

app.post("/posts", createPost);

app.put("/posts/:id", updatePost);

app.delete("/posts/:id", deletePost);
//this line of code is added behind routes, if route doesn't match, it creates error
app.use((req, res) => {
  const error = new Error(res.status(500).json({ error: "Wrong route" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
