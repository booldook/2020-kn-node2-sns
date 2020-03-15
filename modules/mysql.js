const mysql = require('mysql2/promise');
const connect = mysql.createPool({
	host: "db.booldook4.gabia.io",
	port: 3306,
	user: "booldook4",
	password: process.env.dbpass,
	database: 'dbbooldook4',
	connectionLimit: 10,
	waitForConnections: true
});

module.exports = { connect };