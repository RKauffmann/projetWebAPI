var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bddbde"
});

con.connect(function(){
	console.log("connected!");
});

module.exports = con 
