require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "cereallovers",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists users; CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(40) NOT NULL, cereal_id INT, city VARCHAR(40), photo TEXT, dob TEXT, gender_id INT, PRIMARY KEY (id)), FOREIGN KEY (cereal_id, gender_id);";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");
  let sql =
    "DROP TABLE if exists cereal; CREATE TABLE cereal(id INT NOT NULL AUTO_INCREMENT, type VARCHAR(40) NOT NULL, image TEXT, PRIMARY KEY (id));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `cereal` was successful!");
  let sql =
    "DROP TABLE if exists gender; CREATE TABLE gender(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(40) NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `gender` was successful!");

    console.log("Closing...");
  });

  con.end();
});
