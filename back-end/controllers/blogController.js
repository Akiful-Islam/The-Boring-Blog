import asyncHandler from "express-async-handler";
import database from "../config/database.js";
import { blogTbl, userTbl } from "../config/databaseConst.js";

/*@desc Get personal blogs
  @route GET /api/blogs/personalblogs
  @access Private*/
export const getPersonalBlogs = asyncHandler(async (req, res) => {
  const userId = req.user[userTbl.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${blogTbl.tableName} WHERE ${blogTbl.userID}='${userId}'`
  );

  const blogList = rows;

  res.json(blogList);
});

/*@desc Get other peoples blogs
  @route GET /api/blogs/blog/:userId
  @access Private*/
export const getBlogsByUser = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;

  const [rows] = await database.query(
    `SELECT * FROM ${userTbl.tableName} 
     WHERE ${userTbl.userID}='${userId}';`
  );
  const userExists = rows[0];
  if (userExists) {
    const [results] = await database.query(
      `SELECT * FROM ${blogTbl.tableName} WHERE ${blogTbl.userID}='${userId}'`
    );
    const blogList = results;

    res.json(blogList);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*@desc Get all blogs
  @route GET /api/blogs/
  @access Private*/
export const getAllBlogs = asyncHandler(async (req, res) => {
  const [rows] = await database.query(`SELECT * FROM ${blogTbl.tableName};`);

  const blogList = rows;
  res.json(blogList);
});

/*@desc Create a blog
  @route POST /api/blogs/write
  @access Private*/
export const writeBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user[userTbl.userID];

  const [rows] = await database.query(`INSERT INTO ${blogTbl.tableName}
    (${blogTbl.title},${blogTbl.description},${blogTbl.userID})
    VALUES ('${title}','${description}','${userId}');
    `);

  res.json({
    blogId: rows.insertId,
    title,
    description,
    dateCreated: new Date(),
    userId,
  });
});

/*@desc Update a blog
  @route PATCH /api/blogs/edit
  @access Private*/
export const editBlog = asyncHandler(async (req, res) => {
  const { blogId, title, description } = req.body;
  const userId = req.user[userTbl.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${blogTbl.tableName} WHERE ${blogTbl.blogID}='${blogId}'`
  );

  const blog = rows[0];

  const isAuthor = blog[blogTbl.userID] == userId;

  if (blog && isAuthor) {
    const updatedTitle = title || blog[blogTbl.title];
    const updatedDesc = description || blog[blogTbl.description];

    console.log(userId, blogId, updatedTitle, updatedDesc);

    const [result] = await database.query(
      `UPDATE ${blogTbl.tableName}
      SET ${blogTbl.title}=${updatedTitle}, ${blogTbl.description}=${updatedDesc}
      WHERE ${blogTbl.blogID}=${blogId} AND ${blogTbl.userID}=${userId};`
    );

    res.json({
      blogId,
      title: updatedTitle,
      description: updatedDesc,
      dateCreated: blog[blogTbl.dateCreated],
      userId,
    });
  } else if (!blog) {
    res.status(401);
    throw new Error("Blog does not exist");
  } else {
    res.status(403);
    throw new Error("Unauthorized. Not the author of the blog");
  }
});

/*@desc Delete a blog
  @route DELETE /api/blogs/delete
  @access Private*/
export const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user[userTbl.userID];

  const [rows] = await database.query(
    `SELECT * FROM ${blogTbl.tableName} WHERE ${blogTbl.blogID}='${blogId}'`
  );

  const blog = rows[0];

  const isAuthor = blog[blogTbl.userID] == userId;

  if (blog && isAuthor) {
    const [result] = await database.query(
      `DELETE FROM ${blogTbl.tableName} WHERE ${blogTbl.blogID}=${blogId} AND ${blogTbl.userID}=${userId};`
    );

    res.json({ blogId, message: "Blog deleted" });
  } else if (!blog) {
    res.status(401);
    throw new Error("Blog does not exist");
  } else {
    res.status(403);
    throw new Error("Unauthorized. Not the author of the blog");
  }
});
