import express from "express";
import {
  signinUser,
  getUserProfile,
  signupUser,
  updateUserProfile,
  updateUserPassword,
  getAllUser,
  getProfileById,
} from "../controllers/userController.js";
import { check } from "express-validator";
import { validationCheck } from "../middleware/validationMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/signin").post(signinUser);

userRouter
  .route("/signup")
  .post(
    [
      check("username", "Name field can not be empty.").notEmpty(),
      check("email", "Invalid email.").isEmail(),
      check("gender", "Gender field can not be empty.").notEmpty(),
      check(
        "dateOfBirth",
        "Inavlid Date of Birth. A valid date format required."
      )
        .trim()
        .isDate(),
      check(
        "password",
        "Invalid Password. Password must contain: at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character."
      ).isStrongPassword(),
    ],
    validationCheck,
    signupUser
  );

userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(
    protect,
    [
      check("username", "Name field can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
      check("email", "Invalid email.").optional({ nullable: true }).isEmail(),
      check("gender", "Gender field can not be empty.")
        .optional({ nullable: true })
        .notEmpty(),
      check(
        "dateOfBirth",
        "Inavlid Date of Birth. A valid date format required."
      )
        .optional({ nullable: true })
        .trim()
        .isDate(),
      check(
        "password",
        "Invalid Password. Password cannot be empty."
      ).notEmpty(),
    ],
    validationCheck,
    updateUserProfile
  )
  .put(
    protect,
    [
      check("oldPassword", "Old password required.").notEmpty(),
      check("newPassword")
        .notEmpty()
        .withMessage("New password required.")
        .isStrongPassword()
        .withMessage(
          "Invalid Password. Password must contain: at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character."
        ),
      check("confirmPassword")
        .custom(
          (confirmPassword, { req }) => req.body.newPassword !== confirmPassword
        )
        .withMessage("New Passwords Do Not Match!"),
    ],
    validationCheck,
    updateUserPassword
  );

userRouter.route("/profile/:userId").get(protect, getProfileById);

userRouter.route("/").get(getAllUser);

export default userRouter;
