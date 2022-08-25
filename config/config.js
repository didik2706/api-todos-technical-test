require("dotenv").config();
const {
  MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME
} = process.env;

module.exports = {
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "dialect": "mysql"
  }
}
