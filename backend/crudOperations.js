import pg from "pg";
const { Client } = pg;

export const getAllPosts = async (req, res) => {
  const client = new Client({ connectionString: process.env.PG_URI });
  try {
    await client.connect();
    const results = await client.query("SELECT * FROM posts;");
    res.status(200);
    res.json(results.rows);
    // return console.log(results.rows);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500);
    res.json({ error: "Internal Server Error", details: error.message });
  } finally {
    await client.end();
  }
};

export const createPost = async (req, res) => {
  const client = new Client({
    connectionString: process.env.PG_URI,
  });
  try {
    const { title, author, content, cover } = req.body;
    if (!title || !author || !content || !cover)
      return res.status(500).send("All elements in body required");

    await client.connect();
    const results = await client.query(
      "INSERT INTO posts (title, author, content, cover) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, author, content, cover]
    );
    res.status(201);
    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error creating post: ", error);
    res.json({ error: "Internal Server Error", details: error.message });
  } finally {
    await client.end();
  }
};
export const updatePost = async (req, res) => {
  const client = new Client({ connectionString: process.env.PG_URI });
  const id = req.params.id;
  try {
    if (!id || isNaN(id) || Number(id) <= 0) {
      console.error(`Id must be positive number :`);
      res.status(500);
      res.json({ error: "Id must be positive number" });
    }
    const { title, author, content, cover } = req.body;
    await client.connect();
    const results = await client.query(
      "UPDATE posts SET title=$1, author=$2, content=$3, cover=$4 WHERE id=$5 RETURNING *",
      [title, author, content, cover, id]
    );
    res.status(200);
    res.json(results.rows);
  } catch (error) {
    console.error(`Error updating post:${id}`, error);
    res.status(500);
    res.json({ error: "Internal Server Error", details: error.message });
  } finally {
    await client.end();
  }
};

export const deletePost = async (req, res) => {
  const client = new Client({ connectionString: process.env.PG_URI });
  const id = req.params.id;

  try {
    if (!id || isNaN(id) || Number(id) <= 0) {
      console.error(`Id must be positive number :`);
      res.status(500);
      res.json({ error: "Id must be positive number" });
    }
    await client.connect();
    const results = await client.query(
      "DELETE FROM posts WHERE id=$1 RETURNING *",
      [id]
    );
    res.status(200);
    res.json(results.rows);
  } catch (error) {
    console.error(`Error deleting post:${id}`, error);
    res.status(500);
    res.json({ error: "Internal Server Error", details: error.message });
  } finally {
    await client.end();
  }
};

export const getOnePost = async (req, res) => {
  const client = new Client({ connectionString: process.env.PG_URI });
  const id = req.params.id;
  try {
    if (!id || isNaN(id) || Number(id) <= 0) {
      console.error(`Id must be positive number :`);
      res.status(500);
      res.json({ error: "Id must be positive number" });
    }
    await client.connect();
    const results = await client.query("SELECT * FROM posts WHERE id=$1 ;", [
      id,
    ]);
    res.status(200);
    res.json(results.rows);
  } catch (error) {
    console.error(`Error fetching post:${id}`, error);
    res.status(500);
    res.json({ error: "Internal Server Error", details: error.message });
  } finally {
    await client.end();
  }
};
