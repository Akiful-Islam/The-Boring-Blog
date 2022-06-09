import database from "./database.js";
import { blogTbl, userTbl } from "./databaseConst.js";

const initUserTable = async () => {
  return await database.query(`CREATE TABLE IF NOT EXISTS ${userTbl.tableName} 
  (
    ${userTbl.userID} INT PRIMARY KEY AUTO_INCREMENT, 
    ${userTbl.userName} VARCHAR(30), 
    ${userTbl.email} VARCHAR(100), 
    ${userTbl.password} VARCHAR(250),
    ${userTbl.dob} DATE,
    ${userTbl.gender} VARCHAR(15)
    );`);
};

const initBlogTable = async () => {
  return await database.query(`CREATE TABLE IF NOT EXISTS ${blogTbl.tableName} 
  (
    ${blogTbl.blogID} INT PRIMARY KEY AUTO_INCREMENT, 
    ${blogTbl.title} TEXT, 
    ${blogTbl.description} TEXT, 
    ${blogTbl.dateCreated} DATETIME DEFAULT CURRENT_TIMESTAMP,
    ${blogTbl.userID} INT,
    FOREIGN KEY (${blogTbl.userID}) REFERENCES ${userTbl.tableName}(${userTbl.userID}));`);
};

const initTables = async () => {
  try {
    await initUserTable();
    await initBlogTable();
    console.log("Tables built");
  } catch (error) {
    console.log(error);
  }
};

export default initTables;
