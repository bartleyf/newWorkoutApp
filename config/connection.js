var Sequelize = require("sequelize");

var sequelize = new Sequelize("users_db","root","root",{
  host:"localhost",
  dialect:"mysql",
  pool: {
    max:5,
    min:0,
    idle:1000
  }
});

module.exports = sequelize;