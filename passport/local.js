const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { connect } = require('../modules/mysql');

const cb = async (email, userpw, done) => {
	let sql, result;
	try {
		sql = "SELECT * FROM user WHERE email=?";
		result = await connect.execute(sql, [email]);
		console.log(result);
		if(result[0][0]) {
			let match = await bcrypt.compare(userpw, result[0][0].userpw);
			if(match) done(null, result[0][0]);
			else done(null, false, "이메일/패스워드가 일치하지 않습니다.");
		}
		else done(null, false, "이메일/패스워드가 일치하지 않습니다.");
	}
	catch(err) {
		console.log(err);
	}
}

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'userpw'
	}, cb));
};