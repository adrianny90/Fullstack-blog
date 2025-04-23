# Fullstack-blog

Database:
Set up a PostgreSQL database, remember you can do it locally or in Neon
Create a posts table with at least the following fields, feel free to add more if needed
id: Primary key, auto-incrementing integer.
author:
title: Text field for the post title, can’t be NULL.
content: Text field for the post content, can’t be NULL.
cover: Text field for the image cover, can’t be NULL.
date : Date field, defaults to the creation time.
Frontend
Create a new React application using Vite
Use React Router for navigation between pages.
Your application should have the following pages:
Homepage: Displays a list of available posts.
Create Post Page: Contains a form to create a new post.
Post Details Page: Displays a single post’s information by ID with buttons to delete or update the post.
Make sure to handle form input and validation appropriately.
Backend
Set up a Node.js server using the built-in http module.
Use the pg package to connect to your PostgreSQL database.
Create the following endpoints for the posts resource:
GET /posts: Retrieve all posts.
GET /posts/:id: Retrieve a single post by ID.
POST /posts: Create a new post.
PUT /posts/:id: Update an existing post by ID.
DELETE /posts/:id: Delete a post by ID.
