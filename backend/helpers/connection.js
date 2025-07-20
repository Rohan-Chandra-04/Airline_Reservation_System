import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_ID,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
