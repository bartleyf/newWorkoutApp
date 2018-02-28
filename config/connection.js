var Sequelize = require("sequelize");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 sequelize = new Sequelize("users_db","root","root",{
  host:"localhost",
  dialect:"mysql",
  pool: {
    max:5,
    min:0,
    idle:1000
  }
});
}

connection.connect(function (err) {
  if (err) {
    console.error("error connectiing: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = sequelize;