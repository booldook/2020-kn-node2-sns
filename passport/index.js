const local = require('./local');
const { connect } = require('../modules/mysql');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		let sql, result, user;
		sql = "SELECT * FROM user WHERE id="+id;
		result = await connect.execute(sql);
		user = result[0][0];
		done(null, user);
	});
	local(passport);
	//kakao(passport);
};