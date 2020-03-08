const mysql = require('mysql2/promise');
const connect = mysql.createPool({
	host: "localhost",
	port: 3307,
	user: "root",
	password: process.env.dbpass,
	database: 'twit',
	connectionLimit: 10,
	waitForConnections: true
});

module.exports = { connect };