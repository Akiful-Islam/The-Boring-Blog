import express from "express";
import {
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogsByUser,
  getPersonalBlogs,
  writeBlog,
} from "../controllers/blogController.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const blogRouter = express.Router();

blogRouter.use(protect);

blogRouter.route("/").get(getAllBlogs);

blogRouter
  .route("/write")
  .post(
    [
      check("title", "Title can not be empty.").notEmpty(),
      check("content", "Content can not be empty.").notEmpty(),
    ],
    validationCheck,
    writeBlog
  );

blogRouter
  .route("/edit")
  .patch(
    [
      check("blogId", "Blog ID required.").notEmpty(),
      check("title", "Title can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
      check("content", "Content can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
    ],
    validationCheck,
    editBlog
  );

blogRouter
  .route("/delete/:blogId")
  .delete(
    [check("blogId", "Blog ID required.").notEmpty()],
    validationCheck,
    deleteBlog
  );

blogRouter.route("/personalblogs").get(getPersonalBlogs);

blogRouter.route("/blog/:userId").get(getBlogsByUser);

export default blogRouter;
