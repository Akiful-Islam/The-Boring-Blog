import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import database from "../config/database.js";
import { userTbl } from "../config/databaseConst.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      //use this id to search users in the database
      const userID = decodedToken.id;

      const [rows] = await database.query(
        `SELECT * FROM ${userTbl.tableName} WHERE ${userTbl.userID} = '${userID}'`
      );
      const user = rows[0];
      if (user[userTbl.userID]) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized. Token failed");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized. Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. No token found");
  }
});
export { protect };
