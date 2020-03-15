const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { connect } = require('../modules/mysql');
const { alertLoc } = require('../modules/util');
const { isLogin, isLogout } = require('../modules/auth-chk');
const router = express.Router();

router.post('/join', isLogout, async (req, res, next) => {
	let {email, username, userpw } = req.body;
	let sql, sqlVals, result, pugVals;
	sql = "SELECT email FROM user WHERE email=?";
	result = await connect.execute(sql, [email]);
	if(result[0][0]) {
		res.send(alertLoc("이미 존재하는 이메일 입니다.", "/"));
	}
	else {
		userpw = await bcrypt.hash(userpw, 11);
		sql = "INSERT INTO user SET email=?, username=?, userpw=?, api=?, api_id=?, created=now(), updated=now()";
		sqlVals = [email, username, userpw, 'local', ''];
		result = await connect.execute(sql, sqlVals);
		res.send(alertLoc("회원가입이 되었습니다", "/"));
	}
});

router.post("/login", isLogout, async (req, res, next) => {
	const done = (err, user, msg) => {
		if(err) return next(err);
		if(!user) return res.send(alertLoc(msg, "/"));
		else {
			req.login(user, (err) => {
				if(err) return next(err);
				else return res.send(alertLoc("로그인 되었습니다.", "/"));
			});
		}
	}
	passport.authenticate('local', done)(req, res, next);
});

router.get("/logout", isLogin, (req, res, next) => {
	req.logout();
	req.app.locals.user = null;
	res.send(alertLoc("로그아웃 되었습니다.", "/"));
});

// /users/idchk, body => email=booldook@gmail.com
router.post("/idchk", isLogout, async (req, res, next) => {
	let { email } = req.body;
	let sql, result;
	sql = "SELECT email FROM user WHERE email=?";
	result = await connect.execute(sql, [email]);
	if(result[0][0]) res.json({result: false});
	else res.json({result: true});
});

module.exports = router;
