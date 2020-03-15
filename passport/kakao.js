const KakaoStrategy = require('passport-kakao').Strategy;
const { connect } = require('../modules/mysql');

const cb = async (accessToken, refreshToken, profile, done) => {
	console.log(profile);
	let sql, result;
	let user = {
		accessToken,
		username: profile.displayName,
		email: profile._json.kakao_account.email
	}
	sql = "SELECT id FROM user WHERE api=? AND api_id=?";
	result = await connect.execute(sql, ['kakao', profile.id]);
	if(result[0][0]) {
		user.id = result[0][0].id;
		sql = "UPDATE user SET api_token=? WHERE id=?";
		result = await connect.execute(sql, [accessToken, user.id]);
	}
	else {
		sql = "INSERT INTO user SET email=?, username=?, api=?, api_id=?, api_token=?";
		result = await connect.execute(sql, [
			profile._json.kakao_account.email ? profile._json.kakao_account.email : null, 
			profile.username,
			'kakao', 
			profile.id,
			accessToken 
		]);
	}
	done(null, user);
}

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.kakao,
		callbackURL: '/users/kakao/cb'
	}, cb));
}