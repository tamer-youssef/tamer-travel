const mysql = require('mysql');

// Tamer Travel SQL Database Configuration
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin123',
    database: 'tamertraveldatabase'
});

// connect to database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Tamer Travel Database!");
  });

module.exports = connection;