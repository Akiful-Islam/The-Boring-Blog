import mysql2 from "mysql2/promise.js";
import { dbName } from "./databaseConst.js";

const initDatabaseConnection = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "",
      database: dbName,
    });

    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const database = await initDatabaseConnection();

export default database;
