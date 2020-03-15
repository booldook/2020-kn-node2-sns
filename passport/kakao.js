const KakaoStrategy = require('passport-kakao').Strategy;
const { connect } = require('../modules/mysql');

const cb = (accessToken, refreshToken, profile, done) => {
	console.log(profile);
	done(null, true);
}

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.kakao,
		callbackURL: '/users/kakao/cb'
	}, cb));
}