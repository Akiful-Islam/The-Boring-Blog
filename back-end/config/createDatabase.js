import mysql2 from "mysql2/promise.js";
import { dbName } from "./databaseConst.js";

const initDatabase = async () => {
  const connection = await mysql2.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);

  console.log("Database created");

  connection.end();
};

initDatabase();
