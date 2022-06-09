import asyncHandler from "express-async-handler";
import database from "../config/database.js";
import { userTbl } from "../config/databaseConst.js";
import { hashPassword, verifyPassword } from "../utils/encryption.js";
import generateToken from "../utils/generateToken.js";

/*@desc Auth user and get token
  @route POST /api/users/signin
  @access Public */
export const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await database.query(
    `SELECT * FROM ${userTbl.tableName} WHERE ${userTbl.email} = '${email}';`
  );

  const user = rows[0];

  if (user && (await verifyPassword(user[userTbl.password], password))) {
    res.json({
      userId: user[userTbl.userID],
      name: user[userTbl.userName],
      email: user[userTbl.email],
      token: generateToken(user[userTbl.userID]),
    });
  } else {
    res.status(401);
    throw Error("Invalid email and password");
  }
});

/*@desc Register user
  @route POST /api/users/signup
  @access Public */
export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, dateOfBirth, gender, password } = req.body;

  const [isEmailUsed] = await database.query(
    `SELECT ${userTbl.email} FROM ${userTbl.tableName} WHERE ${userTbl.email} = '${email}';`
  );

  if (!isEmailUsed.length) {
    const [rows] = await database.query(
      `INSERT INTO ${userTbl.tableName} (${userTbl.email}, ${
        userTbl.password
      }, ${userTbl.userName}, ${userTbl.dob}, ${userTbl.gender}) 
       VALUES ('${email}', '${await hashPassword(
        password
      )}', '${name}','${dateOfBirth}','${gender}');`
    );

    res.json({
      userId: rows.insertId,
      name,
      email,
      token: generateToken(rows.insertId),
    });
  } else {
    res.status(400);
    throw new Error("Email already in use");
  }
});

/*@desc Get user profile
  @route GET /api/users/profile
  @access Private*/
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const [rows] = await database.query(
    `SELECT * FROM ${userTbl.tableName} 
     WHERE ${userTbl.userID}='${user[userTbl.userID]}';`
  );

  const userInfo = rows[0];

  if (userInfo) {
    res.json({
      userId: userInfo[userTbl.userID],
      name: userInfo[userTbl.userName],
      email: userInfo[userTbl.email],
      dateOfBirth: userInfo[userTbl.dob],
      gender: userInfo[userTbl.gender],
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*@desc Update user profile
  @route PATCH /api/users/profile
  @access Private*/
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user[userTbl.userID];

  const { name, email, dateOfBirth, gender, password } = req.body;

  const [results] = await database.query(
    `SELECT * FROM ${userTbl.tableName} WHERE ${userTbl.userID} = '${userId}';`
  );

  const user = results[0];

  const passwordCorrect = await verifyPassword(
    user[userTbl.password],
    password
  );

  if (user && passwordCorrect) {
    const [isEmailUsed] = await database.query(
      `SELECT ${userTbl.email} FROM ${userTbl.tableName} WHERE ${userTbl.email} = '${email}';`
    );

    if (!isEmailUsed.length) {
      const updatedName = name || user[userTbl.userName];
      const updatedEmail = email || user[userTbl.email];
      const updatedGender = gender || user[userTbl.gender];
      const updatedDOB = dateOfBirth || user[userTbl.dob];

      const [rows] = await database.query(
        `UPDATE ${userTbl.tableName}
         SET ${userTbl.email}='${updatedEmail}', ${userTbl.userName}='${updatedName}', ${userTbl.dob}='${updatedDOB}', ${userTbl.gender}='${updatedGender}'
         WHERE ${userTbl.userID} = '${userId}';`
      );

      console.log(rows);

      res.json({
        userId,
        name: updatedName,
        email: updatedEmail,
        gender: updatedGender,
        dateOfBirth: updatedDOB,
      });
    } else {
      res.status(401);
      throw new Error("Email Already in use");
    }
  } else if (!passwordCorrect) {
    res.status(401);
    throw new Error("Wrong password");
  }
});

/*@desc Update user password
  @route PATCH /api/users/profile/password
  @access Private*/
export const updateUserPassword = asyncHandler(async (req, res) => {
  const userId = req.user[userTbl.userID];
  const { newPassword, oldPassword } = req.body;

  const [results] = await database.query(
    `SELECT * FROM ${userTbl.tableName} WHERE ${userTbl.userID} = '${userId}';`
  );

  const user = results[0];

  const passwordCorrect = await verifyPassword(
    user[userTbl.password],
    oldPassword
  );

  if (passwordCorrect) {
    const [rows] = await database.query(`UPDATE ${userTbl.tableName}
    SET ${userTbl.password}='${await hashPassword(newPassword)}'
    WHERE ${userTbl.userID}='${userId}';`);

    console.log(rows[0]);

    res.send("Password updated");
  } else {
    res.status(401);
    throw new Error("Wrong password");
  }
});

/*@desc Get all users
  @route GET /api/users/
  @access Private*/
export const getAllUser = asyncHandler(async (req, res) => {
  const [rows] =
    await database.query(`SELECT ${userTbl.userID},${userTbl.userName},${userTbl.email},${userTbl.dob},${userTbl.gender} 
  FROM ${userTbl.tableName};`);

  const userList = rows;
  res.json(userList);
});
