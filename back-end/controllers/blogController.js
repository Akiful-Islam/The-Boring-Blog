import asyncHandler from "express-async-handler";
import database from "../config/database.js";
import { blogTbl, userTbl } from "../config/databaseConst.js";
import NodeCache from "node-cache";

const mikeAsh = new NodeCache();

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
    const [results] =
      await database.query(`SELECT ${blogTbl.tableName}.*, ${userTbl.userName} FROM ${blogTbl.tableName} 
    JOIN ${userTbl.tableName} USING(${userTbl.userID}) 
    WHERE ${userTbl.userID} = '${userId}' 
    ORDER BY ${blogTbl.dateCreated} DESC;`);
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
  const blogCache = mikeAsh.get("blogCache");

  if (blogCache === undefined) {
    const [rows] =
      await database.query(`SELECT ${blogTbl.tableName}.*, ${userTbl.userName} 
      FROM ${blogTbl.tableName} 
    JOIN ${userTbl.tableName} 
    USING(${userTbl.userID}) 
    ORDER BY ${blogTbl.dateCreated} DESC;`);
    const blogList = rows;
    mikeAsh.set("blogCache", blogList, 15);
  }

  res.json(mikeAsh.get("blogCache"));
});

/*@desc Create a blog
  @route POST /api/blogs/write
  @access Private*/
export const writeBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user[userTbl.userID];
  const username = req.user[userTbl.userName];

  const [rows] = await database.query(`INSERT INTO ${blogTbl.tableName}
    (${blogTbl.title},${blogTbl.description},${blogTbl.userID})
    VALUES ('${title}','${content}','${userId}');
    `);

  res.json({
    blogId: rows.insertId,
    title,
    content,
    dateCreated: new Date(),
    userId,
    username,
  });
});

/*@desc Update a blog
  @route PATCH /api/blogs/edit
  @access Private*/
export const editBlog = asyncHandler(async (req, res) => {
  const { blogId, title, content } = req.body;
  const userId = req.user[userTbl.userID];
  const username = req.user[userTbl.userName];

  const [rows] = await database.query(
    `SELECT * FROM ${blogTbl.tableName} WHERE ${blogTbl.blogID}='${blogId}'`
  );

  const blog = rows[0];

  const isAuthor = blog[blogTbl.userID] == userId;

  if (blog && isAuthor) {
    const updatedTitle = title || blog[blogTbl.title];
    const updatedDesc = content || blog[blogTbl.description];

    console.log(userId, blogId, updatedTitle, updatedDesc);

    const [result] = await database.query(
      `UPDATE ${blogTbl.tableName}
      SET ${blogTbl.title}='${updatedTitle}', ${blogTbl.description}='${updatedDesc}'
      WHERE ${blogTbl.blogID}=${blogId} AND ${blogTbl.userID}=${userId};`
    );

    res.json({
      blogId,
      title: updatedTitle,
      content: updatedDesc,
      dateCreated: blog[blogTbl.dateCreated],
      userId,
      username,
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
  const { blogId } = req.params;
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
