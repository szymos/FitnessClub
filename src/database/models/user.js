const db = require('../db');

module.exports.getUserValues = (args, email, next) => {
	const columns = Object.values(args).join(', ');
	db.query('SELECT ' + columns + ' FROM users WHERE email = ?;', [email], (err, data) => {
		if (data)
		data = data[0];
		next(err, data);
	});
};

module.exports.save = (data, next) => {
	db.query('INSERT INTO users(firstname, lastname, email, telephone, password) VALUES(?, ?, ?, ?, ?)', Object.values(data), next);
};